import { useOutletContext, useNavigate } from "react-router";
import { SaleRecordsAPI } from "../local_APIs/sale_records";
import { bifrostAPI } from "../local_APIs/bifrost";

import { useContext } from "react";
import {
  dProduct,
  dProduct_bifrost,
  baseStateExTurns,
  dSaleRecord,
} from "./mrv_data_types";
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

function clearDepleted({ oRepo = {}, sQtyKey = "iQty" }) {
  const outRepo = cloneDeep(oRepo);
  for (const k of Object.keys(outRepo)) {
    if (!outRepo[k][sQtyKey]) {
      delete outRepo[k];
    }
  }
  return outRepo;
}

function fKeyMaker({ aDistinctKeys = [], oObjectToKey = {} }) {
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

export { fKeyMaker };

/**
 * - Creates item with unique key if it isn't already in the repository, then adds the qty.
 * - Does NOT modify state by default.
 * - Only the key is checked for uniqueness.
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

  // Subract defective items from the total quantity
  const iItemsMinusDefectives = iProdQty - outObj.iDefective;
  if (iItemsMinusDefectives > 0 && bAnyUnwantedMarked)
    outObj.iUnwanted = iItemsMinusDefectives;

  return outObj;
}

export { fReturnReasonStatus };

/////////////////////////////////////////////////////////////////
////////             Data Intersectors
/////////////////////////////////////////////////////////////////

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
  fIsMatch: null,
  fPopulateLens: null,
  fBuildLune: null,
  fBuildLune1: null,
  fBuildLune2: null,
};

//----------

function fLuneLenser({
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

  Loop_Outer: for (const thisOuterKey of Object.keys(oOuterPool)) {
    const thisL1_Circle = oOuterPool[thisOuterKey];

    // Eventually we may need to sort this but I'm not gonna fuck with it now.
    const aInnerKeys = Object.keys(oInnerPool);

    Loop_Inner: for (const thisInnerKey of aInnerKeys) {
      const thisL2_Circle = oInnerPool[thisInnerKey];

      const bMatch = fIsMatch(thisL1_Circle, thisL2_Circle);

      const iMatchQty = Math.min(
        thisL1_Circle[sQtyKey1],
        thisL2_Circle[sQtyKey2]
      );

      // if no match or overlapping qty, skip to next iterator.
      const bIsValid = bMatch && iMatchQty;

      if (!bIsValid) {
        continue Loop_Inner;
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
      oLens[sQtyKeyLens] = iMatchQty;

      // Straight replaces are OK because the lens qty has already been deducted from the lunes.
      oOutLenses[oLens.sKey] = oLens;
      oOuterPool[thisOuterKey] = oLune1;
      oInnerPool[thisInnerKey] = oLune2;
    }
  }

  // Clean up the lunes and lenses
  const oOut = {
    oLenses: oOutLenses,
    oOuterLunes: clearDepleted({ oRepo: oOuterPool, sQtyKey: sQtyKey1 }),
    oInnerLunes: clearDepleted({ oRepo: oInnerPool, sQtyKey: sQtyKey2 }),
  };

  return oOut;
}

export { fLuneLenser };

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

    outSessionState.oNavNodes = outNavNodesObj;
    setSessionMRV(outSessionState);

    navigate(outNavNodesObj[targetNodeKey].sRoute);
  };

  return nodeNav;
}

export { useNodeNav };

/////////////////////////////////////////////////////////////////
////////             Auto-Derivation
/////////////////////////////////////////////////////////////////

function useAutoDeriver(sessionState) {
  const sessionMRV = cloneDeep(sessionState);
  const saleRecordsAPI = useContext(SaleRecordsAPI);
  const bifrost = useContext(bifrostAPI);
  const oReturnProds = sessionMRV.returnItems;

  const fAutoDeriver = () => {
    const refBaseState = baseStateExTurns({});
    const refSaleRecord = dSaleRecord({});

    const oOutDerived = {
      receiptedItems: {},
      nrrItems: {},
      likeExchItems: {},
      unlikeExchItems: {},
    };

    //------------------------------------------------------------------
    //    Produce Pseudo-Invos
    //------------------------------------------------------------------

    const aLW_ReturnProds = Object.values(oReturnProds).filter(
      (thisReturnProd) => bifrost?.[thisReturnProd.sBifrostKey]?.bLwEligible
    );
    console.log("aLW_ReturnProds", aLW_ReturnProds);
    const refBifrost_Product = dProduct_bifrost({});

    const aLWpseudoInvoProds = aLW_ReturnProds.map((thisLW_ReturnProd) => {
      // OoS items have no Bifrost data, so we need to use the proxy key.
      const dataKey =
        thisLW_ReturnProd.sProxyKey || thisLW_ReturnProd.sBifrostKey;
      const bifrostData = bifrost?.[dataKey];

      // build the pseudo-invoItem for the LW item.
      const outLwProd = {
        ...cloneDeep(thisLW_ReturnProd),
        sKey: `${thisLW_ReturnProd.sKey}_LW`, // add the LW suffix to the key
        sInvoNum: "Lifetime Warranty",
        iUnitBaseValue: bifrostData.iUnitBaseValue,
        iUnitTax: bifrostData.iUnitTax,
        iQty: 9999, // high qty because LW products don't need a reciept and this prevents depletion.
      };
      return outLwProd;
    });
    console.log("aLWpseudoInvoProds", aLWpseudoInvoProds);

    //------------------------------------------------------------------
    //    Match Return Items to Session Invoices
    //------------------------------------------------------------------

    // unpack items from invoices to feed into fLuneLenser
    const aInvoNums = Object.values(sessionMRV.sessionInvos);
    const aInvoicedItems = aInvoNums.flatMap((thisInvoNum) => {
      const invoItems = Object.values(saleRecordsAPI[thisInvoNum].oItemsSold);
      return invoItems;
    });

    const aMergedProdInvos = [...aInvoicedItems, ...aLWpseudoInvoProds];

    // Uses array indices as 'keys'.  Actual sKey gets built in fLuneLenser.
    // merge in LW invos after so they are only processed if no real invos are found.
    const oInvoicedItems = { ...aMergedProdInvos };
    console.log("oInvoicedItems", oInvoicedItems);
    const receiptedItems = fLuneLenser({
      oOuterRepo: sessionMRV.returnItems,
      oInnerRepo: oInvoicedItems,
      fIsMatch: (oOuterItem, oInnerItem) => {
        return oOuterItem.sBifrostKey === oInnerItem.sBifrostKey;
      },
      fBuildLens: ({ oCircle1, oCircle2 }) => {
        const oOutLens = dProduct({
          sKey: `${oCircle1.sKey}_${oCircle2.sInvoNum}`,
          sBifrostKey: oCircle2.sBifrostKey,
          sInvoNum: oCircle2.sInvoNum,
          iUnitBaseValue: oCircle2.iUnitBaseValue,
          iUnitTax: oCircle2.iUnitTax,
        });
        return oOutLens;
      },
    });
    oOutDerived.receiptedItems = receiptedItems.oLenses;
    oOutDerived.nrrItems = receiptedItems.oOuterLunes;

    //------------------------------------------------------------------
    // Make a lens of Return Items that have receipts.
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    //    whatever's next.
    //------------------------------------------------------------------

    return oOutDerived;
  };
  return fAutoDeriver;
}

export { useAutoDeriver };
