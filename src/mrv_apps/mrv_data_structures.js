import { cloneDeep } from "lodash";
import { useNavigate } from "react-router";

const sharedParamsSchema = {
  iUnitCost: 0,
  iUnitTax: 0,
  sKey: "",
  iQty: 0,
  sBifrostKey: "",
  sProxyKey: "",
};

//// Input Data Structures

function dsMoney(params = {}) {
  // single object parameter

  let { iUnitBaseCost, iUnitTax } =
    //destructuring assignment just assigns the values of the object to the object keys with the same name.
    { ...sharedParamsSchema, ...params }; // If the object doesn't have a key with the same name, it assigns the default value from sharedParamsSchema.

  return {
    // this returns the object with the keys of the same name and their values.  Since these are the only keys assigned, no other keys from sharedParamsSchema are present in the return object.
    iUnitBaseCost,
    iUnitTax,
  };
}

export { dsMoney };

function dsProduct_input() {
  return {
    sKey: "",
    iQty: 0,
    sBifrostKey: "",
    sProxyKey: "",
  };
}

export { dsProduct_input };

//// Derived Data Structures



function dsProduct_complete() {
  return {
    ...product(),
    ...moneyObj(),
  };
}

export { dsProduct_complete };

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
