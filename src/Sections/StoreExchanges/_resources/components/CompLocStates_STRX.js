import {
  returnAtom,
  baseLocState,
  clearedErrors,
  clearedInputs,
  locStFields,
  makeLocStFields,
  errorObj,
} from "../../../../globalFunctions/globalJS_classes";

import { LS_MRV_ReasonPickerSC } from "../../../../mrv/mrv-components/CompLocStates_MRV";

// Singleton Local States -------------------------------------

const LS_STRX_100_AllEntry30 = makeLocStFields({
  _keyStr: "AllEntry30",
  oErrorObjects: {
    invalidReceipt: new errorObj({
      key: "invalidReceipt",
      str: "Invalid Receipt Number",
    }),
    duplicateInvo: new errorObj({
      key: "duplicateInvo",
      str: "Receipt Already Added",
    }),
    invalidItem: new errorObj({
      key: "invalidItem",
      str: "Invalid Item Number",
    }),
    invalidQty: new errorObj({
      key: "invalidQty",
      str: "Invalid Quantity",
    }),
  },
});

// Composite Local States -------------------------------------

const LS_STRX_100_AddItemsAndInvos = {
  page: makeLocStFields({
    _keyStr: "page",
    activeUI3: "AllEntry30",
    activeMode1: "receipt",
    oErrorObjects: {
      noItems: new errorObj({
        key: "noItems",
        str: "No Items Added",
      }),
      invalidReturnReasons: new errorObj({
        key: "invalidReturnReasons",
        str: "Return Reason quantities invalid",
      }),
    },
  }),
  [LS_STRX_100_AllEntry30._keyStr]: LS_STRX_100_AllEntry30,
  [LS_MRV_ReasonPickerSC._keyStr]: LS_MRV_ReasonPickerSC,
};

/*

LS_STRX_100_AddItemsAndInvos.rPan.activeUI1 = "AllEntry30";
LS_STRX_100_AddItemsAndInvos.page.activeMode1 = "receipt";

*/

export { LS_STRX_100_AddItemsAndInvos };

/*
  
  
  
  */
