import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";

import {
  returnAtom,
  baseLocState,
  clearedErrors,
  clearedInputs,
  locStFields,
} from "../../../../globalFunctions/globalJS_classes";

import { AllEntry30 } from "./AllEntry30";
import { ItemDetails30STRX } from "../../_resources/components/ItemDetails30STRX";
import { cloneDeep } from "lodash";

import {
  populateDisposArr,
  useNodeNav,
  useClearLocErrStates,
  useResetLocStFields,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { RtrnItemsList } from "./RtrnItems/RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvos/RtrnInvosList";
import { useOutletContext } from "react-router";

// Singleton Local States -------------------------------------

const LS_STRX_100_AllEntry30 = {
  ...locStFields,
  _keyStr: "AllEntry30",
  activeMode1: "receipt",
};
// Composite Local States -------------------------------------

const LS_STRX_100_AddItemsAndInvos = {
  ...baseLocState,
  rPan: {
    ...baseLocState.rPan,
    activeUI1: "AllEntry30",
    activeMode1: "receipt",
  },
};

/*

LS_STRX_100_AddItemsAndInvos.rPan.activeUI1 = "AllEntry30";
LS_STRX_100_AddItemsAndInvos.page.activeMode1 = "receipt";

*/

export { LS_STRX_100_AddItemsAndInvos };

/*
  
  
  
  */
