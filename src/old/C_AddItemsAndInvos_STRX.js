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

function locSt_AddItemsAndInvos_STRX() {
  // Default Local State -------------------------------------

  const outLocSt = cloneDeep(baseLocState);

  outLocSt.rPan.activeUI1 = "AllEntry30";
  outLocSt.page.activeMode1 = "receipt";

  outLocSt.AllEntry30 = {
    ...cloneDeep(locStFields),
    _keyStr: "AllEntry30",
    activeMode1: "receipt",
  };

  return outLocSt;
}

export { locSt_AddItemsAndInvos_STRX };

function useAddItemsAndInvos_STRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();
  const locStRt = sessionMRV.locSt;
  const clearErrors = useClearLocErrStates();
  const resetFields = useResetLocStFields();

  const outMethods = {};

  // Shared Methods -------------------------------------

  const defaultReset = () => {
    console.log("defaultReset");
    resetFields({ oResetFields: { ...clearedErrors } });
  };

  const bgClick = () => {
    console.log("bgClick");
    //clearErrors();
    defaultReset();
  };

  outMethods.bgClick = bgClick;

  const entryTabClick = ({
    keyStr = "receipt",
    REF_keyStr____item_receipt,
  }) => {
    // handles toggle between item and receipt entry
    console.log("entryTabClick" + keyStr);
    const refLocFields = baseLocState;

    setSessionMRV((draft) => {
      draft.locSt.page.activeMode1 = keyStr;
      draft.locSt.AllEntry30.activeMode1 = keyStr;
    });

    resetFields({
      aNodeKeysToReset: [locStRt.AllEntry30._keyStr],
      oResetFields: { ...clearedInputs, ...clearedErrors },
    });
  };
  outMethods.entryTabClick = entryTabClick;

  //-------------------------------------

  return outMethods;
}

export { useAddItemsAndInvos_STRX };

/*



*/
