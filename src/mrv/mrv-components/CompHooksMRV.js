import { useContext } from "react";
import { useOutlet, useOutletContext } from "react-router-dom";

import { useResetLocStFields, useFindAtom } from "../MRVhooks/MRVhooks";
import {
  oReturnReason,
  returnAtom,
} from "../../globalFunctions/globalJS_classes";
import { find } from "lodash";

function useCompHooks_MRV({}) {
  const mrvCtx = useOutletContext();
  const findAtom = useFindAtom();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const outMethods = {}; // the object to return

  const oReasonPicker_SC = () => {
    const activeItemKey = sessionMRV.locSt.page.activeKey1;
    const activeItem = findAtom({ itemNum: activeItemKey, asIndex: false });

    const activeReasonKey = sessionMRV.locSt.ReasonPickerSC.activeKey1;
    const thisReasonRt =
      sessionMRV.returnReasonsRepo?.[activeItemKey].oAllItemReasons?.[
        activeReasonKey
      ];

    const lsMethods = {
      resetReasonPickerLS: useResetLocStFields("ReasonPickerSC"),

      modeSwitch: ({ keyStr = "no mode key" }) => {
        setSessionMRV((draft) => {
          draft.locSt.ReasonPickerSC.activeMode1 = keyStr;
        });
        lsMethods.resetReasonPickerLS({
          activeErrorALL: true,
          inputALL: true,
          activeData1: true,
        });
      },

      inputQtyValidator: ({ qty }) => {
        const refAtom = new returnAtom({});
        let itemQty = activeItem?.atomItemQty;
        // qtyExceeded, subZero
        return qty < 0 ? "subZero" : qty > itemQty ? "qtyExceeded" : false;
      },

      setReasonRepoQty: ({ newQty }) => {
        const numQty = Number(newQty);
        setSessionMRV((draft) => {
          draft.returnReasonsRepo[activeItemKey].oAllItemReasons[
            activeReasonKey
          ].reasonQty = numQty;
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
          lsMethods.setReasonRepoQty({ newQty: draftQty });
        }
      },
    };
    return lsMethods;
  };
  outMethods.oReasonPicker_SC = oReasonPicker_SC();

  return outMethods;
}

export { useCompHooks_MRV };
