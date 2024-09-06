import { useContext } from "react";
import { useOutlet, useOutletContext } from "react-router-dom";

import { useResetLocStFields, useFindAtom } from "../MRVhooks/MRVhooks";
import {
  itemReturnReasons,
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
    const activeRepoItemObj = sessionMRV.returnReasonsRepo?.[activeItemKey];
    const activeReasonObj =
      activeRepoItemObj?.oAllItemReasons?.[activeReasonKey];

    const resetReasonPickerLS = useResetLocStFields({ locSt: "ReasonPickerSC" });

    const lsMethods = {

      

      exceedsItemQty: (qtyToCheck) => {
        // oriented to True because this will be used to disable stuff.
        const refAtom = new returnAtom({});
        return qtyToCheck >= activeItem.atomItemQty;
      },

      handlePlusMinus: ({ isPlus = true }) => {
        const refOReturnReason = oReturnReason({});
        const sMode = isPlus ? "plus" : "minus";

        const increment = isPlus ? 1 : -1;
        let draftQty = activeReasonObj.reasonQty + increment;
        const qtyError = false; //oReasonPicker_SC.inputQtyValidator({ qty: draftQty });

        const oMode = {
          plus: {
            qtyError: ""
          },
          minus: {},
        };

        if (qtyError) {
          setSessionMRV((draft) => {
            const locReason = draft.locSt.ReasonPickerSC;
            locReason.activeError1 = locReason.oErrorObjects[qtyError];
          });
        } else {
          console.log("draftQty", draftQty);
          lsMethods.setReasonRepoQty({ newQty: draftQty });
        }
      },

      inputQtyValidator: ({ qty }) => {
        const refAtom = new returnAtom({});
        let itemQty = activeItem?.atomItemQty;
        // qtyExceeded, subZero
        return qty < 0 ? "subZero" : qty > itemQty ? "qtyExceeded" : false;
      },

      modeSwitch: ({ keyStr = "no mode key" }) => {
        setSessionMRV((draft) => {
          draft.locSt.ReasonPickerSC.activeMode1 = keyStr;
        });
        resetReasonPickerLS({
          activeErrorALL: true,
          inputALL: true,
          activeData1: true,
        });
      },

      setError: ({ errorKey }) => {
        setSessionMRV((draft) => {
          draft.locSt.ReasonPickerSC.activeError1 =
            draft.locSt.ReasonPickerSC.oErrorObjects[errorKey];
        });
      },

      setReasonRepoQty: ({ newQty }) => {
        const numQty = Number(newQty);
        const refItemReasons = itemReturnReasons({});
        setSessionMRV((draft) => {
          draft.returnReasonsRepo[activeItemKey].oAllItemReasons[
            activeReasonKey
          ].reasonQty = numQty;
        });
      },
    };
    return lsMethods;
  };
  outMethods.oReasonPicker_SC = oReasonPicker_SC();

  return outMethods;
}

export { useCompHooks_MRV };
