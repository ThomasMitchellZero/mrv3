import {
  returnAtom,
  baseLocState,
  clearedErrors,
  clearedInputs,
  locStFields,
} from "../../../../globalFunctions/globalJS_classes";

// Singleton Local States -------------------------------------

const LS_STRX_100_AllEntry30 = {
  ...locStFields,
  _keyStr: "AllEntry30",
};
// Composite Local States -------------------------------------

const LS_STRX_100_AddItemsAndInvos = {
  ...baseLocState,
  page: {
    ...locStFields,
    activeUI3: "AllEntry30",
    activeMode1: "receipt",
  },
  [LS_STRX_100_AllEntry30._keyStr]: LS_STRX_100_AllEntry30,
};

/*

LS_STRX_100_AddItemsAndInvos.rPan.activeUI1 = "AllEntry30";
LS_STRX_100_AddItemsAndInvos.page.activeMode1 = "receipt";

*/

export { LS_STRX_100_AddItemsAndInvos };

/*
  
  
  
  */
