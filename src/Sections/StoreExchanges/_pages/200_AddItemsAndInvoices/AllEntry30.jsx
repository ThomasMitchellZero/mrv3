import { ItemEntry_SC_STRX } from "./ItemEntry_SC_STRX";
import { InvoEntry_SC_STRX } from "./InvoEntry_SC_STRX";

import { Sidesheet_Base_MRV } from "../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import { cloneDeep } from "lodash";

import {} from "../../../../mrv/MRVhooks/MRVhooks";

import { useLocStMethods_STRX } from "../../_resources/components/CompHooks_STRX";

import { useOutletContext } from "react-router";

function AllEntry30() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const locMethods = useLocStMethods_STRX().AddItemsAndInvos();
  const s30Mode = locStRt.page.activeMode1;

  // mode-specific properties
  const oMode = {
    receipt: {
      sLabel: "receipt",
      inputCluster: <InvoEntry_SC_STRX />,
      sidesheetTitle: "Add Receipts",
    },

    item: {
      sLabel: "item",
      inputCluster: <ItemEntry_SC_STRX />,
      sidesheetTitle: "Add Return Items",
    },
  };

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- UI ELEMENTS ---- */

  // Tab Buttons
  const uiTabBtn = (btnType = "NO TITLE") => {
    const isActive = s30Mode === btnType ? "active" : "";
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          locMethods.modeSwitch({ keyStr: btnType });
        }} // this is the issue
        className={`tab fullWidth ${isActive}`}
      >
        {`${oMode[btnType].sLabel}s`}
      </button>
    );
  };

  return (
    <Sidesheet_Base_MRV
      title={oMode[s30Mode].sidesheetTitle}
      fBgClick={locMethods.basicClear}
    >
      <section className={`main_content maxWidth`}>
        <div className={`hBox minFlex`}>
          {uiTabBtn("receipt")}
          {uiTabBtn("item")}
        </div>
        {/* Input cluster varies based on selected Mode */}
        {oMode[s30Mode].inputCluster}
      </section>
    </Sidesheet_Base_MRV>
  );
}

export { AllEntry30 };

/*



*/
