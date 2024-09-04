import { useResetLocStFields } from "../../../MRVhooks/MRVhooks";

import { oReturnReason } from "../../../../globalFunctions/globalJS_classes";

import { useOutletContext } from "react-router";
import { useContext } from "react";

function ReasonPickerSC_MRV({}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const returnReasons = sessionMRV;

  const activeItem = locStRt.page.activeData1;

  const uiChipItemOK = function ({ reason }) {
    // clicking sets it to active or no.
  };

  const uiChipItemDefective = function ({ reason }) {
    // clicking sets it to active or no.
  };

  return (
    <div className={`reasonPicker`}>
      <div className={`tabCtnr`}>
        <div className={`tab fullWidth active`}>For Science.</div>
      </div>
    </div>
  );
}

export { ReasonPickerSC_MRV };