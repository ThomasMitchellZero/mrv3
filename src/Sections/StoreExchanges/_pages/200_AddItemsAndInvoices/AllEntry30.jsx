import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";

import { ItemEntry_SC_STRX } from "../../_resources/components/ItemEntry_SC_STRX";
import { InvoEntry_SC_STRX } from "./InvoEntry_SC_STRX";

import { Sidesheet_Base_MRV } from "../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import { cloneDeep } from "lodash";

import {
  populateDisposArr,
  useNodeNav,
  useClearLocErrStates,
  useResetLocStFields,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useAddItemsAndInvos_STRX } from "./C_AddItemsAndInvos_STRX";

import { RtrnItemsList } from "./RtrnItems/RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvos/RtrnInvosList";
import { useOutletContext } from "react-router";

function AllEntry30() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const locMethods = useAddItemsAndInvos_STRX();
  const resetFields = useResetLocStFields();
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

  const handleTabClick = ({ e, btnType }) => {
    e.preventDefault();
    locMethods.entryTabClick({ keyStr: btnType });
  };

  // Tab Buttons
  const uiTabBtn = (btnType = "NO TITLE") => {
    const isActive = s30Mode === btnType ? "active" : "";
    return (
      <button
        onClick={(e) => handleTabClick({ e: e, btnType: btnType })} // this is the issue
        className={`tab fullWidth ${isActive}`}
      >
        {`${oMode[btnType].sLabel}s`}
      </button>
    );
  };

  return (
    <Sidesheet_Base_MRV title="" fBgClick={handleTabClick}>
      <TitleBarSTRX
        hasCluster={false}
        showProductName={false}
        headerTitle={oMode[s30Mode].sidesheetTitle}
      />
      <section className={`main_content`}>
        <div className={`tabBox`}>
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
