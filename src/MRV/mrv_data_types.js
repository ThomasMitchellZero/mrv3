import { useRef, useState } from "react";
import { oReturnReason } from "../globalFunctions/globalJS_classes";

// Shared parameter schema

const sharedParamsSchema = {
  // universal parameters
  sKey: "",
  iQty: 0,

  // money parameters
  iUnitBaseValue: 0,
  iUnitTax: 0,

  // product parameters
  sBifrostKey: "",
  sProxyKey: "",
  sItemNum: "",
  sModelNum: "",
  sImgKey: "no-image",
  sDescription: "NO DESCRIPTION",

  // return reason parameters
  sReasonCode: "",
  oReturnReasons: null,

  // sale record parameters
  sInvoNum: "",
  sRecordType: "",
  oItemsSold: {},
};

export { sharedParamsSchema };

/////////////////////////////////////////////////////////////
////    Input Data Structures
/////////////////////////////////////////////////////////////

function dMoney(params = {}) {
  // single object parameter

  //destructuring assignment >> fewer const declarations.
  let { iUnitBaseValue, iUnitTax } =
    //  shared parameter schema & defaults unless overridden by params.
    { ...sharedParamsSchema, ...params };

  // return obj lets me auto-assign default values as needed.
  const outObj = {
    iUnitBaseValue,
    iUnitTax,
  };

  return outObj;
}

export { dMoney };

function dReasonCode({
  sKey,
  sProdKey = "",
  bIsDefective = false,
  sLabel = "NO LABEL",
  iQty = 0,
  bIsMarked = false,
}) {
  const outObj = {
    sKey,
    sProdKey,
    bIsDefective,
    sLabel,
    iQty,
    bIsMarked,
  };
  return outObj;
}

export { dReasonCode };

function dReturnReasons(sProdKey = "NO ITEM KEY") {
  const outObj = {
    unwanted: dReasonCode({
      sProdKey: sProdKey,
      sKey: "unwanted",
      sLabel: "Didn't Want",
    }),
    overbought: dReasonCode({
      sProdKey: sProdKey,
      sKey: "overbought",
      sLabel: "Bought Too Many",
    }),
    wrongItem: dReasonCode({
      sProdKey: sProdKey,
      sKey: "wrongItem",
      sLabel: "Wrong Item",
    }),
    noWorky: dReasonCode({
      sProdKey: sProdKey,
      sKey: "noWorky",
      sLabel: "Doesn't Work",
      bIsDefective: true,
    }),
    missingParts: dReasonCode({
      sProdKey: sProdKey,
      sKey: "missingParts",
      sLabel: "Missing Parts",
      bIsDefective: true,
    }),
  };
  return outObj;
}
export { dReturnReasons };

/////////////////////////////////////////////////////////////
////    Session Data Structures (for derived data)
/////////////////////////////////////////////////////////////

function dProduct(params = {}) {
  const {
    sKey,
    iQty,
    sItemNum,
    sBifrostKey,
    sProxyKey,
    sInvoNum,
    sReasonCode,
    oReturnReasons,
  } = {
    ...sharedParamsSchema,
    ...params,
  };

  /**
   * Computes the reason status for a product.
   *
   * @param {Object} params - The parameters for the function.
   * @param {Object} params.oReasonsObj - The reasons object.
   * @param {number} params.iProdQty - The total product quantity.
   * @returns {ItemReasonStatus} The computed reason status.
   */
  const fReasonStatus = ({ oReasonsObj = {}, iProdQty }) => {
    if (!oReasonsObj) {
      // terminate if no reasons object
      return "No reasons object";
    }

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
  };

  const outSKey = sKey || `_${sItemNum}`;

  const outObj = {
    sKey: outSKey,
    iQty,
    sItemNum,
    sBifrostKey: sBifrostKey || sItemNum,
    sProxyKey,
    sReasonCode,
    oReturnReasons: oReturnReasons || dReturnReasons(outSKey),
    sInvoNum,
    get oItemReasonStatus() {
      return fReasonStatus({
        oReasonsObj: this.oReturnReasons,
        iProdQty: this.iQty,
      });
    },
    ...dMoney(params),
  };
  return outObj;
}

export { dProduct };

/////////////////////////////////////////////////////////////
////    Mock Server Data Types
/////////////////////////////////////////////////////////////

function dProduct_bifrost(params = {}) {
  const { sKey, sImgKey, sDescription, sModelNum, sItemNum } = {
    ...sharedParamsSchema,
    ...params,
  };
  const outObj = {
    sKey,
    sImgKey,
    sDescription,
    sModelNum,
    sItemNum,
    ...dMoney(params),
  };
  return outObj;
}

export { dProduct_bifrost };

function dSaleRecord(params = {}) {
  const { sKey, sInvoNum, sRecordType, oItemsSold } = {
    ...sharedParamsSchema,
    ...params,
  };
  const outObj = {
    sKey: sKey || sInvoNum,
    sRecordType,
    sInvoNum,
    oItemsSold,
  };

  return outObj;
}

export { dSaleRecord };

/////////////////////////////////////////////////////////////
//// App Logic Objects
/////////////////////////////////////////////////////////////

function navNode({
  keyStr = "",
  sRoute = "",
  sTitle = "No Title",
  isCurrent = false,
  hasBreadcrumb = false,
  isActive = false,
  preloadSessionState = {}, // wondering if this should be a function?
}) {
  return {
    keyStr,
    sRoute,
    sTitle,
    isActive,
    isCurrent,
    hasBreadcrumb,
    preloadSessionState,
  };
}

export { navNode };

function baseStateExTurns({
  oNavNodes = {},
  returnItems = {},
  sessionInvos = {},
  returnReasons = {},
  newItems = {},
}) {
  return {
    oNavNodes,
    returnItems,
    sessionInvos,
    returnReasons,
    newItems,
  };
}

export { baseStateExTurns };

const oBaseLocState = {
  // shares fields that will be common to all local states.
  sActiveError: "",
  sActiveOverlay: "",
  sMode: "",
};

export { oBaseLocState };

function dError({ sKey = "", sMessage = "", bClearOnBGClick = true }) {
  return {
    sKey,
    sMessage,
    bClearOnBGClick,
  };
}

export { dError };

function dPage({ oInitLS, oResets, oMethods, oErrorObjects }) {
  // Define state and ref inside the dPage object
  const [oPageLS, setPageLS] = useState(oInitLS);
  const oPageLSRef = useRef(oPageLS);

  // Wrap the state setter to update both the state and the ref
  const fSetPageLS = (newState) => {
    oPageLSRef.current = newState; // Update the ref
    setPageLS(newState); // Update the state
  };

  return {
    oInitLS,
    get oPageLS() {
      return oPageLSRef.current; // Always return the latest value from the ref
    },
    oResets,
    fSetPageLS,
    oMethods,
    oErrorObjects,
  };
}

export { dPage };
