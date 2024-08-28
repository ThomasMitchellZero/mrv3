

import {
  returnAtom,
  baseLocState,
  clearedErrors,
  clearedInputs,
  locStFields,
} from "../../../../globalFunctions/globalJS_classes";


import {
  useResetLocStFields,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

function useLocStMethods_STRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
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
    const refLocFields = baseLocState;

    setSessionMRV((draft) => {
      draft.locSt.page.activeMode1 = keyStr;
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

export { useLocStMethods_STRX };

/*
  
  
  
  */
