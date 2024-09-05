import { find, set } from "lodash";
import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useResetLocStFields,
  useFindAtom,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

function useLocStMethods_STRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSession = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const findAtom = useFindAtom();

  const outMethods = {};

  const resetPageLS = useResetLocStFields("page");

  // Shared Methods -------------------------------------

  const AddItemsAndInvos = () => {
    const resetAllEntry30LS = useResetLocStFields("AllEntry30");
    const resetReasonPickerLS = useResetLocStFields("ReasonPickerSC");

    const lsMethods = {
      basicClear: () => {
        console.log("Ya Basic");
        resetPageLS({ activeErrorALL: true });
        resetAllEntry30LS({ activeErrorALL: true });
      },

      resetKeysToo: () => {
        resetAllEntry30LS({ activeErrorALL: true });
        console.log("Ya Clear Keys Too");
        resetPageLS({ activeErrorALL: true, activeKey1: true });
        resetReasonPickerLS({ activeErrorALL: true, activeKey1: true });
      },

      modeSwitch: ({ keyStr = "receipt" }) => {
        setSession((draft) => {
          draft.locSt.page.activeMode1 = keyStr;
        });
        resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
        resetPageLS({ activeErrorALL: true });
      },
    };

    return lsMethods;
  };

  outMethods.AddItemsAndInvos = AddItemsAndInvos();

  //-------------------------------------

  return outMethods;
}

export { useLocStMethods_STRX };

/*
  
  
  
  */
