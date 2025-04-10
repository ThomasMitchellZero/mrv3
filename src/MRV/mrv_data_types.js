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

/**
 * Creates a product object with various properties and methods.
 *
 * @param {Object} params - The parameters for creating the product.
 * @param {string} [params.sKey] - A unique key for the product. Defaults to `_${sBifrostKey}` if not provided.
 * @param {number} [params.iQty=0] - The quantity of the product.
 * @param {string} [params.sItemNum] - The item number of the product.
 * @param {string} [params.sBifrostKey] - A key used for Bifrost integration.
 * @param {string} [params.sProxyKey] - A proxy key for the product.
 * @param {string} [params.sInvoNum] - The invoice number associated with the product.
 * @param {string} [params.sReasonCode] - A reason code for the product's return.
 * @param {Object} [params.oReturnReasons] - An object containing reasons for the product's return.
 * @returns {Object} The product object.
 * @returns {string} returnObj.sKey - The unique key for the product.
 * @returns {number} returnObj.iQty - The quantity of the product.
 * @returns {string} returnObj.sItemNum - The item number of the product.
 * @returns {string} returnObj.sBifrostKey - The Bifrost key for the product.
 * @returns {string} returnObj.sProxyKey - The proxy key for the product.
 * @returns {string} returnObj.sReasonCode - The reason code for the product's return.
 * @returns {Object} returnObj.oReturnReasons - The reasons for the product's return.
 * @returns {string} returnObj.sInvoNum - The invoice number associated with the product.
 */
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

  const outSKey = sKey || `_${sBifrostKey}`;

  const outObj = {
    sKey: outSKey,
    iQty,
    sItemNum,
    sBifrostKey: sBifrostKey || sItemNum,
    sProxyKey,
    sReasonCode,
    oReturnReasons: oReturnReasons || dReturnReasons(outSKey),
    sInvoNum,
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

function dLocalCtx({ oInitLS, oResets, oMethods, oErrorObjects }) {
  const [oThisLS, setThisLS] = useState(oInitLS);
  const oThisLSRef = useRef(oThisLS);

  // Wrap the state setter to update both the state and the ref
  const fSetLocalState = (newState) => {
    oThisLSRef.current = newState; // Update the ref
    setThisLS(newState); // Update the state
  };

  return {
    oInitLS,
    get oLocalState() {
      return oThisLSRef.current; // Always return the latest value from the ref
    },
    oResets,
    fSetLocalState,
    oMethods,
    oErrorObjects,
  };
}

export { dLocalCtx };
