import { useContext } from "react";
import { useOutlet, useOutletContext } from "react-router-dom";

import { useResetLocStFields } from "../MRVhooks/MRVhooks";
import {
  oReturnReason,
  returnAtom,
} from "../../globalFunctions/globalJS_classes";
import { set } from "lodash";

function useCompHooks_MRV({}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const activeItem = sessionMRV.locSt.page.activeData1;
  const activeReason = sessionMRV.locSt.ReasonPickerSC.activeData1;
  const thisReasonRt = sessionMRV.returnReasonsRepo[activeItem.atomItemNum]

  const outMethods = {}; // the object to return

  const oReasonPicker_SC = {
    resetReasonPickerLS: useResetLocStFields("ReasonPickerSC"),

    modeSwitch: ({ keyStr = "no mode key" }) => {
      setSessionMRV((draft) => {
        draft.locSt.ReasonPickerSC.activeMode1 = keyStr;
      });
      oReasonPicker_SC.resetReasonPickerLS({
        activeErrorALL: true,
        inputALL: true,
        activeData1: true,
      });
    },

    inputQtyValidator: ({ qty }) => {
      const refAtom = new returnAtom({});
      let itemQty = sessionMRV.locSt.page.activeData1?.atomItemQty;
      // qtyExceeded, subZero
      return qty < 0 ? "subZero" : qty > itemQty ? "qtyExceeded" : false;
    },

    setReasonRepoQty: ({ newQty }) => {
      console.log("Qty Setting:", newQty);
      setSessionMRV((draft) => {
        draft.returnReasonsRepo[activeItem.atomItemNum].oAllItemReasons[
          activeReason.keyStr
        ].reasonQty = newQty;
      });
    },

    handlePlusMinus: ({ plus = true }) => {
      const refOReturnReason = oReturnReason({});
      const increment = plus ? 1 : -1;
      let draftQty = thisReasonRt.reasonQty + increment;
      const qtyError = false; //oReasonPicker_SC.inputQtyValidator({ qty: draftQty });

      if (qtyError) {
        console.log("qtyError", qtyError);
        setSessionMRV((draft) => {
          const locReason = draft.locSt.ReasonPickerSC;
          locReason.activeError1 = locReason.oErrorObjects[qtyError];
        });
      } else {
        console.log("draftQty", draftQty);
        oReasonPicker_SC.setReasonRepoQty({ newQty: draftQty });
      }
    },
  };
  outMethods.oReasonPicker_SC = oReasonPicker_SC;

  return outMethods;
}

export { useCompHooks_MRV };
