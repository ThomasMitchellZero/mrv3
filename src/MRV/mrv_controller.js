import { useOutletContext, useNavigate } from "react-router";

import { useContext } from "react";
import { dProduct } from "./mrv_data_types";
import { clone, cloneDeep, isEmpty, isNaN, merge, set, subtract } from "lodash";
import { navNode } from "./mrv_data_types";

//// Money Handlers ////

const centsToDollars = (priceInCents = 4200) => {
  return Number.parseFloat(priceInCents / 100).toFixed(2);
};
export { centsToDollars };

const greenify = (numberVal) => {
  // This JUST returns a CSS class.  Not the number, not a UI element.  Just a class.
  const isNeg = typeof numberVal === "number" && numberVal < 0;
  return isNeg ? "color__green__text" : "";
};

export { greenify };

/////////////////////////////////////////////////////////////////
////////             Data Handlers
/////////////////////////////////////////////////////////////////

function keymaker({ aDistinctKeys = [], oObjectToKey = {} }) {
  /**
   * Creates a unique key from a list of distinct keys and an object to key.
   * @param {array} aDistinctKeys - List of property keys used in this level of differentiation.
   * @param {object} oObjectToKey - Object to key.
   * @returns {string} The unique key.
   */
  let sOutKey = "";
  for (const thisKey of aDistinctKeys) {
    const thisVal = oObjectToKey?.[thisKey];
    let sOutSegment = thisVal || `NONE`;
    sOutSegment += `{${thisKey}_${sOutSegment}__}`;
  }
  return sOutKey;
}

export { keymaker };

/**
 * - Creates item with unique key if it isn't already in the repository, then adds the qty.
 * - Does NOT modify state by default.
 * - Only the key is checked for uniqueness.
 *
 * @param {object} oTargetRepo - The repository that directly contains the item being added.
 * @param {dProduct} oItemToAdd - The item to add.  Must be in dProduct format and contain a qty.
 * @param {string} [sUniqueKey] - OPTIONAL.  For cases where oItemToAdd lacks a unique key.
 * @returns {object} A clone of the updated repository.
 */
function addItem({ oTargetRepo = {}, oItemToAdd = {}, sUniqueKey = "" }) {
  const refProduct = dProduct({});
  const sProdKey = sUniqueKey || oItemToAdd.sKey;
  const iQtyToAdd = oItemToAdd.iQty;
  if (isNaN(iQtyToAdd)) {
    console.error("addItem requires a quantity to add.");
    return;
  }

  const outRepo = cloneDeep(oTargetRepo);
  if (outRepo[sProdKey]) {
    // If the item is already in the repo, add the qty.
    outRepo[sProdKey].iQty += iQtyToAdd;
  } else {
    // If the item isn't in the repo, add it.
    outRepo[sProdKey] = oItemToAdd;
  }

  return outRepo;
}

export { addItem };

function matchMaker({
  aRepo1 = [],
  aRepo2 = [],
  fSortRepo1 = (a) => a,
  fSortRepo2 = (a) => a,
  fIsMatch = ({ oRepo1Item = {}, oRepo2Item = {} }) => {
    return true;
  },
  fBuildMatch = ({ oRepo1Item = {}, oRepo2Item = {} }) => {
    return { yaDone: "goofed" };
  },
  sQtyKey1 = "iQty",
  sQtyKey2 = "iQty",
}) {
  // check ourselves before we wreck ourselves.
  if (!Array.isArray(aRepo1) || !Array.isArray(aRepo2)) {
    console.error("matchMaker requires two arrays as inputs.");
    return;
  }

  const aMatches = [];

  // These 2 arrays get depleted as matches are found.
  const aUnmatched1 = fSortRepo1(cloneDeep(aRepo1));
  const aUnmatched2 = fSortRepo2(cloneDeep(aRepo2));

  Loop_Repo1: for (const thisItem1 of aRepo1) {
    Loop_Repo2: for (const thisItem2 of aRepo2) {
      const bIsMatch = fIsMatch({
        oRepo1Item: thisItem1,
        oRepo2Item: thisItem2,
      });

      // If the items don't match, continue to the next item in repo2.
      if (!bIsMatch) {
        continue Loop_Repo2;
      }

      // If the items do match, get the quantity they have in common.
      const iOverlapQty = Math.min(thisItem1[sQtyKey1], thisItem2[sQtyKey2]);

      // here's the guts.

      // Unmatched Repo1
      // Unmatched Repo2
      // Matched = []

      // Got this weird intuition this can be done in a single loop, and it's swinging strangely between obviously yes and obviously no.
    }
  }
}

function fInitResetLS({ oInitLS = {}, oPageLS = {} }) {
  /**
   * Resets any parameter passed as `true` in `params` to its initial value in `oInitLS`.
   * If `ALL` is passed as `true`, resets all parameters.
   *
   * @param {object} params - An object where keys correspond to fields in `oInitLS`.
   * @param {boolean} [params.ALL=false] - If `true`, resets all fields to their initial values.
   * @returns {object} A clone of the updated local state (LS).
   */
  const fResetLS = (params = { ALL: false }) => {
    const outLS = cloneDeep(oPageLS);

    for (const sKey of Object.keys(oInitLS)) {
      // Reset the field if params.ALL is true or if the specific field is set to true in params
      if (params.ALL === true || params?.[sKey] === true) {
        outLS[sKey] = oInitLS[sKey];
      }
    }
    return outLS;
  };
  return fResetLS;
}

export { fInitResetLS };

/////////////////////////////////////////////////////////////////
////////             Node Navigation
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
    let nodeBeforeTarget = true;

    // Nodes preceeding target get enabled to permit back-nav, nodes following get disabled.
    for (const thisNode of Object.values(outNavNodesObj)) {
      thisNode.isCurrent = false; // Set all as not current.  Current node will be marked true later.
      thisNode.isActive = nodeBeforeTarget; // all nodes preceeding target are active to permit back-nav.

      // once target node is reached, flip bool so all subequent nodes are inactive.
      if (thisNode.keyStr === targetNodeKey) {
        nodeBeforeTarget = false;
      }
    }

    // activate the target node and make it available.
    outNavNodesObj[targetNodeKey].isCurrent = true;

    // ensure all automatic derivations are up-to-date.
    outSessionState = mrvAutoDeriver({ sessionState: outSessionState });

    outSessionState.oNavNodes = outNavNodesObj;
    setSessionMRV(outSessionState);
    console.log(
      "attempting navihation to",
      outNavNodesObj[targetNodeKey].sRoute
    );

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
