import { find, set } from "lodash";
import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import { useResetLocStFields, useFindAtom } from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

function useLocStMethods_STRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSession = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const findAtom = useFindAtom();

  const outMethods = {};

  const resetPageLS = useResetLocStFields("page");
  const resetAllEntry30LS = useResetLocStFields("AllEntry30");

  // Shared Methods -------------------------------------

  const AddItemsAndInvos = {




    basicClear: () => {
      console.log("Ya Basic");
      resetPageLS({ activeErrorALL: true });
      resetAllEntry30LS({ activeErrorALL: true });
    },

    clearKeysToo: () => {
      resetAllEntry30LS({ activeErrorALL: true });
      resetPageLS({ activeErrorALL: true, activeKey1: true });
    },

    modeSwitch: ({ keyStr = "receipt" }) => {
      setSession((draft) => {
        draft.locSt.page.activeMode1 = keyStr;
      });
      resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
      resetPageLS({ activeErrorALL: true });
    },

    resetAllEntry30LS: resetAllEntry30LS,
  };

  outMethods.AddItemsAndInvos = AddItemsAndInvos;

  //-------------------------------------

  return outMethods;
}

export { useLocStMethods_STRX };

/*
  
  
  
  */
