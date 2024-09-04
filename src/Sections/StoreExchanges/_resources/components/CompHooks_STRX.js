import { set } from "lodash";
import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import { useResetLocStFields } from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

function useLocStMethods_STRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSession = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;

  const outMethods = {};

  const resetPageLS = useResetLocStFields("page");
  const resetAllEntry30LS = useResetLocStFields("AllEntry30");

  // Shared Methods -------------------------------------


  const basicClear = () => {
    console.log("Ya Basic");
    resetPageLS({ activeErrorALL: true });
    resetAllEntry30LS({ activeErrorALL: true });
  };

  outMethods.basicClear = basicClear;

  const clearDataToo = () => {
    console.log("And Your Little Data Too"); 
    resetAllEntry30LS({ activeErrorALL: true });
    resetPageLS({ activeErrorALL: true, activeData1: true });
  }

  outMethods.clearDataToo = clearDataToo;


  const modeSwitch = ({ keyStr = "receipt" }) => {
    setSession((draft) => {
      draft.locSt.page.activeMode1 = keyStr;
    });
    resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
    resetPageLS({ activeErrorALL: true });
  };

  outMethods.modeSwitch = modeSwitch;

  //-------------------------------------

  return outMethods;
}

export { useLocStMethods_STRX };

/*
  
  
  
  */
