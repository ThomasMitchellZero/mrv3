import { useContext } from "react";
import { useOutlet, useOutletContext } from "react-router-dom";

import { useResetLocStFields } from "../MRVhooks/MRVhooks";
import { set } from "lodash";

function useCompHooks_MRV({}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

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
  };

  outMethods.oReasonPicker_SC = oReasonPicker_SC;

  return outMethods;
}

export { useCompHooks_MRV };
