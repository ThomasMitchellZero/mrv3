import { useContext } from "react";
import { useOutlet, useOutletContext } from "react-router-dom";

import {
  useResetLocStFields,
  useSetLocStFields,
  useFindAtom,
} from "../MRVhooks/MRVhooks";
import {
  itemReturnReasons,
  oReturnReason,
  returnAtom,
} from "../../globalFunctions/globalJS_classes";

function useCompHooks_MRV() {
  const mrvCtx = useOutletContext();
  const findAtom = useFindAtom();

  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const outMethods = {}; // the object to return

  const universal = () => {};
  outMethods.universal = universal();

  const oReasonPicker_SC = () => {
    const activeItemKey = sessionMRV.locSt.page.activeKey1;
    const activeItem = findAtom({ itemNum: activeItemKey, asIndex: false });
    const errorsObj = sessionMRV.locSt.ReasonPickerSC.oErrorObjects;
    const setReasonPickerLS = useSetLocStFields("ReasonPickerSC");
    const resetReasonPickerLS = useResetLocStFields({
      locSt: "ReasonPickerSC",
    });

    // route shortcuts
    const activeReasonKey = sessionMRV.locSt.ReasonPickerSC.activeKey1;
    const activeRepoItemObj = sessionMRV.returnReasonsRepo?.[activeItemKey];
    const activeReasonObj =
      activeRepoItemObj?.oAllItemReasons?.[activeReasonKey];

    const lsMethods = {
      handlePlusMinus: ({ isPlus = true }) => {
        const refOReturnReason = oReturnReason({});
        const sMode = isPlus ? "plus" : "minus";

        const increment = isPlus ? 1 : -1;
        let draftQty = activeReasonObj.reasonQty + increment;
        const qtyError = false;

        if (qtyError) {
          setReasonPickerLS({
            activeError1: errorsObj[qtyError],
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
        console.log("modeSwitch", keyStr);
        setReasonPickerLS({
          activeMode1: keyStr,
        });

        resetReasonPickerLS({
          activeErrorALL: true,
          inputALL: true,
          activeData1: true,
        });
      },

      isReasonQtyValid: ({
        itemAtom,
        validCondition = "notOver",
        ref_validCondition____notOver,
      }) => {
        // returns boolean of item passing validCondition fn.
        const refAtom = new returnAtom({});
        const returnItemQty = itemAtom.atomItemQty;
        const itemReasonQty =
          sessionMRV.returnReasonsRepo?.[itemAtom.atomItemNum]?.allReasonsQty();

        const oConditionConfigs = {
          notOver: {
            outBool: itemReasonQty <= returnItemQty,
          },
          notUnder: {
            outBool: itemReasonQty >= returnItemQty,
          },
        };

        return oConditionConfigs[validCondition].outBool;
      },

      setError: ({ errorKey }) => {
        setReasonPickerLS({
          activeError1: errorsObj[errorKey],
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
  // gotta acutally call the function in the LSs, otherwise we got a bunch of references to things that don't exist in scope.
  outMethods.oReasonPicker_SC = oReasonPicker_SC;

  return outMethods;
}

export { useCompHooks_MRV };
