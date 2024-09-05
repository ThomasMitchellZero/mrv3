import "./_AddItemsAndInvosSTRX.css";

import { ContinueBtnMRV } from "../../../../mrv/mrv-components/inputs/ContinueBtnMRV";

import { useLocStMethods_STRX } from "../../_resources/components/CompHooks_STRX";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";

import {
  baseLocState,
  locStFields,
  returnAtom,
} from "../../../../globalFunctions/globalJS_classes";

import { AllEntry30 } from "./AllEntry30";
import { RtrnItemDetails30 } from "./RtrnItems/RtrnItemDetails30";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import { RtrnItemsList } from "./RtrnItems/RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvos/RtrnInvosList";
import { useOutletContext } from "react-router";

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&     MAIN COMPONENT    &&&&&&&&&&&&&&&//
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function AddItemsAndInvosSTRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();
  const locMethods = useLocStMethods_STRX().AddItemsAndInvos;

  const activeMode = sessionMRV.locSt.page.activeMode1;
  const activeUI = sessionMRV.locSt.page.activeUI3;
  const errorObjRt = sessionMRV.locSt.page.oErrorObjects;
  const activeError = sessionMRV.locSt.page.activeError1;

  const oMode = {
    item: {
      s70label: "Items Being Returned",
      s70panel: <RtrnItemsList />,
    },
    receipt: {
      s70label: "Receipts List",
      s70panel: <RtrnInvosList />,
    },
  };

  // 30 panel is determined conditionally, so I will just do that here.
  const active30key =
    sessionMRV.locSt.page.activeKey1 && activeMode === "item"
      ? "ItemDetails30"
      : "AllEntry30";

  const o30panels = {
    AllEntry30: <AllEntry30 />,
    ItemDetails30: <RtrnItemDetails30 />,
  };

  const uiContinueWarning =
    activeError?.key === "noItems" ? errorObjRt?.noItems?.str : "";

  /* ---- SHARED FUNCTIONS ---- */

  const handleContinue = (e) => {
    e.stopPropagation();

    if (activeMode === "receipt") {
      locMethods.modeSwitch({ keyStr: "item" });
    } else if (sessionMRV.returnItems.length === 0) {
      setSessionMRV((draft) => {
        draft.locSt.page.activeError1 = errorObjRt?.noItems;
      });
    } else {
      nodeNav("reason");
    }
  };

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`addItemsAndInvos mrvPage color__surface__subdued`}>
      <main onClick={locMethods.clearKeysToo} className={`mrvPanel__main`}>
        <TitleBarSTRX
          showProductName={true}
          headerTitle={oMode[activeMode].s70label}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>{oMode[activeMode].s70panel}</div>

        <div className={`footer_content`}>
          <CashTotalSTRX />
          <ContinueBtnMRV
            warningText={uiContinueWarning}
            handleClick={(e) => handleContinue(e)}
          />
        </div>
      </main>
      {o30panels[active30key]}
    </section>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
