import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";

import { ItemEntry_SC_STRX } from "../../_resources/components/ItemEntry_SC_STRX";
import { InvoEntry_SC_STRX } from "./InvoEntry_SC_STRX";

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
    },

    item: {
      sLabel: "item",
      inputCluster: <ItemEntry_SC_STRX />,
    },
  };

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- UI ELEMENTS ---- */

  const handleTabClick = ({ e, btnType }) => {
    e.preventDefault();
    locMethods.entryTabClick({ keyStr: btnType });
  };

  // Tab Buttons
  const uiTabBtn = (btnType = "dong") => {
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
    <main
      onClick={() => locMethods.bgClick()}
      className={`allEntry30 mrvPanel__side color__surface__default`}
    >
      <TitleBarSTRX
        hasCluster={false}
        showProductName={false}
        headerTitle={"Add To Exchange"}
      />
      <section className={`main_content`}>
        <div className={`tabBox`}>
          {uiTabBtn("receipt")}
          {uiTabBtn("item")}
        </div>
        {/* Input cluster varies based on selected Mode */}
        {oMode[s30Mode].inputCluster}
      </section>
    </main>
  );
}

export { AllEntry30 };

/*



*/
