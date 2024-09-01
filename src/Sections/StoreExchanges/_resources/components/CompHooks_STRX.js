import { set } from "lodash";
import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import {} from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

function useLocStMethods_STRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSession = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;

  const outMethods = {};

  // Shared Methods -------------------------------------

  const defaultReset = () => {
    const refLocFields = locStFields();
  };

  const bgClick = () => {
    setSession((draft) => {
      console.log("Tried to BG click");
      draft.locSt.page = {
        ...draft.locSt.page,
        ...clearedErrors,
        activeData1: null,
      };
      draft.locSt.AllEntry30 = { ...draft.locSt.AllEntry30, ...clearedErrors };
    });
  };

  outMethods.bgClick = bgClick;

  const entryTabClick = ({
    keyStr = "receipt",
    REF_keyStr____item_receipt,
  }) => {
    // handles toggle between item and receipt entry

    setSession((draft) => {
      draft.locSt.page.activeMode1 = keyStr;
      draft.locSt.AllEntry30 = { ...draft.locSt.AllEntry30, ...clearedErrors, ...clearedInputs };
    });
  };
  outMethods.entryTabClick = entryTabClick;

  const handleItemInvoContinue = () => {
    // still need to set up.
    console.log("handleItemInvoContinue");
    //clearErrors();
    defaultReset();
  };

  //-------------------------------------

  return outMethods;
}

export { useLocStMethods_STRX };

/*
  
  
  
  */
