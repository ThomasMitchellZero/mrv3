import { useOutletContext, useNavigate } from "react-router";

import { useContext } from "react";

import { cloneDeep, isEmpty, isNaN, merge, set, subtract } from "lodash";
import { navNode } from "./mrv_data_structures";

//// Money Handlers ////

const centsToDollars = (priceInCents = 4200) => {
  return Number.parseFloat(priceInCents / 100).toFixed(2);
};
export { centsToDollars };

const greenify = (numberVal) => {
  // This JUST returns a class.  Not the number, not a UI element.  Just a class.
  const isNeg = typeof numberVal === "number" && numberVal < 0;

  return isNeg ? "color__green__text" : "";
};

export { greenify };

/////////////////////////////////////////////////////////////////
////////             Node Navigation                     ////////
/////////////////////////////////////////////////////////////////

function useNodeNav() {
  const navigate = useNavigate();

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const nodeNav = (targetNodeKey = "") => {
    /**
     * test function to navigate to a target node.
     */
    const refNavNode = navNode({});

    const thisTargetNode = sessionMRV.oNavNodes[targetNodeKey];

    // if the target node doesn't exist, console log an error and return.
    if (!thisTargetNode) {
      console.error("Node key does not exist in sessionMRV.oNavNodes");
      return;
    }

    //Otherwise, we can proceed with the navigation.

    const preloadState = thisTargetNode.preloadSessionState;
    let outSessionState = { ...cloneDeep(sessionMRV), ...preloadState };
    const outNavNodesObj = outSessionState.oNavNodes;

    // all nodes prior to the target remain enabled.
    let nodeAfterTarget = false;

    // Nodes preceeding target get enabled to permit back-nav, nodes following get disabled.
    for (const thisNode of Object.values(outNavNodesObj)) {
      thisNode.selected = false; // deselect all nodes.  Active node will be reselected later.
      thisNode.disabled = nodeAfterTarget; // deactivate all nodes

      // once target node is reached, flip bool so all subequent nodes are disabled.
      if (thisNode.keyStr === targetNodeKey) {
        nodeAfterTarget = true;
      }
    }

    // activate the target node and make it available.
    outNavNodesObj[targetNodeKey].selected = true;

    // ensure all automatic derivations are up-to-date.
    outSessionState = mrvAutoDeriver({ sessionState: outSessionState });

    outSessionState.oNavNodes = outNavNodesObj;
    setSessionMRV(outSessionState);
    console.log("attempting navihation to", outNavNodesObj[targetNodeKey].sRoute);

    navigate(outNavNodesObj[targetNodeKey].sRoute);
  };

  return nodeNav;
}

export { useNodeNav };

function mrvAutoDeriver({ sessionState }) {
  /**
   * Performs all automatic derivations from inputs in the session state.
   * @param {object} sessionState - State to run through the AutoDeriver.
   * @returns {object} The updated session state.
   */

  const outSessionState = cloneDeep(sessionState);

  return outSessionState;
}

export { mrvAutoDeriver };
