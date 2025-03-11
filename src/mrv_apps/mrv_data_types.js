import { cloneDeep } from "lodash";
import { useNavigate } from "react-router";

// Shared parameter schema

const sharedParamsSchema = {
  iUnitBaseValue: 0,
  iUnitTax: 0,
  sKey: "",
  iQty: 0,
  sBifrostKey: "",
  sProxyKey: "",
  sItemNum: "",
  sModelNum: "",
  sImgKey: "no-image",
  sDescription: "NO DESCRIPTION",
};

export { sharedParamsSchema };

/////////////////////////////////////////////////////////////
////    Input Data Structures
/////////////////////////////////////////////////////////////

function dsMoney(params = {}) {
  // single object parameter

  let { iUnitBaseValue, iUnitTax } =
    //destructuring assignment just assigns the values of the object to the object keys with the same name.
    { ...sharedParamsSchema, ...params }; // If the object doesn't have a key with the same name, it assigns the default value from sharedParamsSchema.

  return {
    // this returns the object with the keys of the same name and their values.  Since these are the only keys assigned, no other keys from sharedParamsSchema are present in the return object.
    iUnitBaseValue,
    iUnitTax,
  };
}

export { dsMoney };

function dsProduct_input(params = {}) {
  const { sKey, iQty, sBifrostKey, sProxyKey } = {
    ...sharedParamsSchema,
    ...params,
  };
  return {
    sKey,
    iQty,
    sBifrostKey,
    sProxyKey,
  };
}

export { dsProduct_input };

/////////////////////////////////////////////////////////////
////    Session Data Structures (for derived data)
/////////////////////////////////////////////////////////////

function dsProduct_session(params = {}) {
  return {
    ...dsProduct_input(params),
    ...dsMoney(params),
  };
}

export { dsProduct_session };

/////////////////////////////////////////////////////////////
////    Mock Server Data Types
/////////////////////////////////////////////////////////////

function dsProduct_bifrost(params = {}) {
  const { sKey, sImgKey, sDescription, sModelNum, sItemNum } = {
    ...sharedParamsSchema,
    ...params,
  };

  return {
    sKey,
    sImgKey,
    sDescription,
    sModelNum,
    sItemNum,
  };
}

export { dsProduct_bifrost };

//// App Logic Objects

function navNode({
  keyStr = "",
  sRoute = "",
  sTitle = "No Title",
  selected = false,
  hasBreadcrumb = false,
  disabled = true,
  preloadSessionState = {}, // wondering if this should be a function?
}) {
  return {
    keyStr,
    sRoute,
    sTitle,
    selected,
    hasBreadcrumb,
    disabled,
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
