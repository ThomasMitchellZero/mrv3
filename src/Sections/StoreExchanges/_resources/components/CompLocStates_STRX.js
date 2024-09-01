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
  oErrorObjects: Object.freeze({
    invalidReceipt: new errorObj({
      str: "Invalid Receipt Number",
    }),
    duplicateInvo: new errorObj({
      str: "Receipt Already Added",
    }),
    invalidItem: new errorObj({
      str: "Invalid Item Number",
    }),
    invalidQty: new errorObj({
      str: "Invalid Quantity",
    }),
  }),
};
LS_STRX_100_AllEntry30.init = Object.freeze(LS_STRX_100_AllEntry30);

// Composite Local States -------------------------------------

const LS_STRX_100_AddItemsAndInvos = {
  ...baseLocState,
  page: {
    ...locStFields,
    activeUI3: "AllEntry30",
    activeMode1: "receipt",
    oErrorObjects: Object.freeze({
      
    }),
  },
  [LS_STRX_100_AllEntry30._keyStr]: LS_STRX_100_AllEntry30,
};

LS_STRX_100_AddItemsAndInvos.init = Object.freeze(LS_STRX_100_AddItemsAndInvos);

/*

LS_STRX_100_AddItemsAndInvos.rPan.activeUI1 = "AllEntry30";
LS_STRX_100_AddItemsAndInvos.page.activeMode1 = "receipt";

*/

export { LS_STRX_100_AddItemsAndInvos };

/*
  
  
  
  */
