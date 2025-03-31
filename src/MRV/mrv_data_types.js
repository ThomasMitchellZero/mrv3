import { useRef, useState } from "react";

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
  sReturnReason: "",

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
    sReturnReason,
  } = {
    ...sharedParamsSchema,
    ...params,
  };
  const outObj = {
    sKey: sKey || sItemNum,
    iQty,
    sItemNum,
    sBifrostKey: sBifrostKey || sItemNum,
    sProxyKey,
    sReturnReason,
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
  sActiveDataKey: "",
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
