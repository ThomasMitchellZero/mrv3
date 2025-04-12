import { useOutletContext, useNavigate } from "react-router";

import { useContext } from "react";
import { dProduct } from "./mrv_data_types";
import { clone, cloneDeep, isEmpty, isNaN, merge, set, subtract } from "lodash";
import { navNode } from "./mrv_data_types";

//// Money Handlers ////

function fNo() {}

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

  let sProdKey = String(sUniqueKey || oItemToAdd.sKey);
  // If the key doesn't start with an underscore, add one.  This ensures keys are strings.
  if (sProdKey[0] !== "_") {
    sProdKey = "_" + sProdKey;
  }
  oItemToAdd.sKey = sProdKey;

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

/**
 * Computes the reason status for a return product.
 *
 * @param {Object} oReturnProduct - The product object being returned.
 * @param {Object} oReturnProduct.oReturnReasons - An object containing the reasons for the return.
 * @param {number} oReturnProduct.iQty - The total quantity of the product being returned.
 * @returns {Object} An object containing the computed reason status.
 * @returns {number} returnObj.iDefective - The total quantity of defective items.
 * @returns {number} returnObj.iUnwanted - The total quantity of unwanted items.
 */
function fReturnReasonStatus(oReturnProduct) {
  const oReasonsObj = oReturnProduct.oReturnReasons;
  const iProdQty = oReturnProduct.iQty;

  const aReasons = Object.values(oReasonsObj);
  const outObj = {
    iDefective: 0,
    iUnwanted: 0,
  };

  const bAnyUnwantedMarked = aReasons.some(
    (reason) => reason.bIsMarked && !reason.bIsDefective
  );

  outObj.iDefective = aReasons.reduce(
    // sum all defective quantities
    (acc, reason) => acc + (reason.bIsDefective ? reason.iQty : 0),
    0
  );

  console.log("Item Qty: ", iProdQty);

  // Subract defective items from the total quantity
  const iItemsMinusDefectives = iProdQty - outObj.iDefective;
  if (iItemsMinusDefectives > 0 && bAnyUnwantedMarked)
    outObj.iUnwanted = iItemsMinusDefectives;

  return outObj;
}

export { fReturnReasonStatus };

/////////////////////////////////////////////////////////////////
////////             Intersectors
/////////////////////////////////////////////////////////////////

function matchMaker({
  oNarrowSet = {},
  oBroadSet = {},
  fPreSortBroadSet = (a) => a,
  fIsMatch = ({ oNarrowItem = {}, oBroadItem = {} }) => {
    return false;
  },
  fBuildOutput = ({ oNarrowItem = {}, oBroadItem = {} }) => {
    return { yaDone: "goofed" };
  },
  sQtyKey1 = "iQty",
  sQtyKey2 = "iQty",
}) {
  const oDepleting_NarrowSet = cloneDeep(oNarrowSet);
  const oDepleting_BroadSet = cloneDeep(oBroadSet);

  const aKeys_narrowSet = Object.keys(oDepleting_NarrowSet);
  const aKeys_broadSet = Object.keys(oDepleting_NarrowSet);

  Loop_Repo1: for (const narrowKey of aKeys_narrowSet) {
    // The order in which broadSet items are matched is sometimes relevant.
    const aSortedBroadSet = fPreSortBroadSet(aKeys_broadSet);

    Loop_Repo2: for (const broadKey of aSortedBroadSet) {
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

const oIntersectionParams = {
  oCircle1: {},
  oCircle2: {},
  oLens: null,
  oLune1: null,
  oLune2: null,
  sQtyKey: "iQty",
  sQtyKey1: "iQty",
  sQtyKey2: "iQty",
  sQtyKeyLens: "iQty",
  aLensDistinctKeys: ["sKey"],
  fIsMatch: fNo,
  fPopulateLens: fNo,
  fBuildLune: fNo,
  fBuildLune1: fNo,
  fBuildLune2: fNo,
};

function fTrisector({
  oOuterRepo,
  oInnerRepo,
  fIsMatch = (oCircle1, oCircle2) => {
    return false;
  },
  fBuildLens = ({ oCircle1, oCircle2 }) => {
    yaDone: "goofed";
  },
  fBuildLune1 = (oCircle) => oCircle,
  fBuildLune2 = (oCircle) => oCircle,
  params = {},
}) {
  // Extract shared parameters from oIntersectionParams
  const { sQtyKey1, sQtyKey2, sQtyKeyLens } = {
    ...oIntersectionParams,
    ...params,
  };

  const oOuterPool = cloneDeep(oOuterRepo);
  const oInnerPool = cloneDeep(oInnerRepo);
  const oOutLenses = {};

  Loop_Repo1: for (const thisOuterKey of Object.keys(oOuterPool)) {
    const thisL1_Circle = oOuterPool[thisOuterKey];

    // Eventually we may need to sort this but I'm not gonna fuck with it now.
    const aInnerKeys = Object.keys(oInnerPool);

    Loop_Repo2: for (const thisInnerKey of aInnerKeys) {
      const thisL2_Circle = oInnerPool[thisInnerKey];

      const bMatch = fIsMatch({ thisL1_Circle, thisL2_Circle });

      const iMatchQty = Math.min(
        thisL1_Circle[sQtyKey1],
        thisL2_Circle[sQtyKey2]
      );

      // if no match or overlapping qty, skip to next iterator.
      const bIsValid = bMatch && iMatchQty;

      if (!bIsValid) {
        continue Loop_Repo2;
      }

      const oLune1 = fBuildLune1(thisL1_Circle);
      const oLune2 = fBuildLune2(thisL2_Circle);
      const oLens = fBuildLens({
        oCircle1: thisL1_Circle,
        oCircle2: thisL2_Circle,
      });

      // set the new quantities
      oLune1[sQtyKey1] -= iMatchQty;
      oLune2[sQtyKey2] -= iMatchQty;
      oLens[sQtyKeyLens];

      // Straight replaces are OK because the lens qty has already been deducted from the lunes.
      oOutLenses[oLens.sKey] = oLens;
      oOuterPool[thisOuterKey] = oLune1;
      oInnerPool[thisInnerKey] = oLune2;
    }
  }

  const oOut = {
    oLenses: oOutLenses,
    oOuterLunes: oOuterPool,
    oInnerLunes: oInnerPool,
  };

  return oOut;
}

export { fTrisector };

/// Probably not needed anymore.  But maybe.  Maybe not.  Maybe so.  Maybe not.

/**
 * Creates a "lens" object by intersecting two data sets (circles) based on matching criteria.
 *
 * @param {Object} params - The parameters for crafting the lens.
 * @param {Object} params.oCircle1 - The first data set (circle) to intersect.
 * @param {Object} params.oCircle2 - The second data set (circle) to intersect.
 * @param {string} [params.sQtyKey1="iQty"] - The key in `oCircle1` representing the quantity.
 * @param {string} [params.sQtyKey2="iQty"] - The key in `oCircle2` representing the quantity.
 * @param {string} [params.sQtyKeyLens="iQty"] - The key in the resulting lens representing the quantity.
 * @param {Function} params.fIsMatch - Defines the matching criteria for the two circles and returns true or false.
 * @param {Function} params.fPopulateLens - A function to build the resulting lens object for matching items.
 *   - Receives an object with `oCircle1` and `oItem2`.
 *   - Should return the constructed lens object.
 * @returns {Object} The crafted lens object containing the intersection of the two circles.
 */
function fLensCrafter(params = {}) {
  const {
    oCircle1,
    oCircle2,
    sQtyKey1,
    sQtyKey2,
    sQtyKeyLens,
    fIsMatch,
    fPopulateLens,
  } = {
    ...oIntersectionParams,
    ...params,
  };

  const bMatch = fIsMatch({ oCircle1, oCircle2 });
  const iMatchQty = Math.min(oCircle1[sQtyKey1], oCircle2[sQtyKey2]);

  // valid lens requires a true match and an overlapping qty.
  // Qty check saves us from having to clean up the circle repos while looping.
  const isInvalid = !bMatch || !iMatchQty;

  if (isInvalid) {
    return null; // Returns null if invalid so downstream logic knows Circles 1 & 2 don't overlap.
  }

  // If the items match, create the lens.
  const oOutLens = fPopulateLens({ oCircle1, oCircle2 });
  oOutLens[sQtyKeyLens] = iMatchQty;

  return oOutLens;
}

export { fLensCrafter };

/**
 * If lens is valid, subtracts the lens quantity from the circle quantity.
 * All other circle properties are unchanged.
 * @param {Object} params - The parameters for crafting the lune.
 * @param {Object} params.oCircle - The original data set (circle).
 * @param {string} params.sQtyKey - The key in `oCircle` representing the quantity.
 * @param {Object} params.oLens - The intersection (lens) to subtract from the circle.
 * @param {string} params.sQtyKeyLens - The key in `oLens` representing the quantity.
 * @returns {Object} Lune with adjusted quantity.  Identical if lens is null.
 */
const fMainLuner = (params = {}) => {
  const { oCircle, sQtyKey, oLens, sQtyKeyLens } = {
    ...oIntersectionParams,
    ...params,
  };

  // If the lens is null, oCircle doesn't change so return it as-is.
  if (!oLens) {
    return oCircle;
  }

  const oOutLune = cloneDeep(oCircle);
  // Reduce the lens qty by the circle qty so that it isn't double-counted.
  oOutLune[sQtyKey] -= oLens[sQtyKeyLens];

  return oOutLune;
};

export { fMainLuner };

/**
 * Intersects two data sets (circles) and computes the lens (intersection) and lunes (non-overlapping portions).
 *
 * @param {Object} params - The parameters for the intersector.
 * @param {Object} params.oCircle1 - The first data set (circle).
 * @param {Object} params.oCircle2 - The second data set (circle).
 * @param {string} [params.sQtyKey1="iQty"] - The key in `oCircle1` representing the quantity.
 * @param {string} [params.sQtyKey2="iQty"] - The key in `oCircle2` representing the quantity.
 * @param {string} [params.sQtyKeyLens="iQty"] - The key in the resulting lens representing the quantity.
 * @param {Function} params.fIsMatch - A function to determine if two items match.
 * @param {Function} params.fPopulateLens - A function to populate the lens object for matching items.
 * @param {Function} [params.fBuildLune1=fMainLuner] - A function to build the lune for `oCircle1`.
 * @param {Function} [params.fBuildLune2=fMainLuner] - A function to build the lune for `oCircle2`.
 * @returns {Object} An object containing the lens and lunes.
 * @returns {Object} returnObj.oLens - The intersection (lens) of the two circles.
 * @returns {Object} returnObj.oLune1 - The non-overlapping portion of `oCircle1`.
 * @returns {Object} returnObj.oLune2 - The non-overlapping portion of `oCircle2`.
 */
function fIntersector(params = {}) {
  const {
    oCircle1,
    oCircle2,
    sQtyKey1,
    sQtyKey2,
    sQtyKeyLens,
    fIsMatch,
    fPopulateLens,
    fBuildLune1 = fMainLuner,
    fBuildLune2 = fMainLuner,
  } = {
    ...oIntersectionParams,
    ...params,
  };

  // Validate required inputs
  if (!oCircle1 || !oCircle2) {
    throw new Error("fIntersector: Both oCircle1 and oCircle2 are required.");
  }

  const oOutLens = fLensCrafter({
    oCircle1,
    oCircle2,
    sQtyKey1,
    sQtyKey2,
    sQtyKeyLens,
    fIsMatch,
    fPopulateLens,
  });

  const oOutLune1 = fBuildLune1({
    oCircle: oCircle1,
    sQtyKey: sQtyKey1,
    oLens: oOutLens,
    sQtyKeyLens,
  });

  const oOutLune2 = fBuildLune2({
    oCircle: oCircle2,
    sQtyKey: sQtyKey2,
    oLens: oOutLens,
    sQtyKeyLens,
  });

  const oOut = {
    oLens: oOutLens,
    oLune1: oOutLune1,
    oLune2: oOutLune2,
  };

  return oOut;
}
export { fIntersector };

/////////////////////////////////////////////////////////////////
////////             Node Navigation
/////////////////////////////////////////////////////////////////

function useNodeNav() {
  const navigate = useNavigate();

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const nodeNav = (targetNodeKey = "") => {
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
