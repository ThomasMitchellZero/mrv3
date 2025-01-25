import "./_AddItemsAndInvosSTRX.css";
import { useOutletContext } from "react-router";
import { ContinueBtnMRV } from "../../../../mrv/mrv-components/inputs/ContinueBtnMRV";

import { useLocStMethods_STRX } from "../../_resources/components/CompHooks_STRX";

import {
  baseLocState,
  locStFields,
  returnAtom,
} from "../../../../globalFunctions/globalJS_classes";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";
import { AllEntry30 } from "./AllEntry30";
import { RtrnItemDetails30 } from "./RtrnItems/RtrnItemDetails30";
import { RtrnItemsList } from "./RtrnItems/RtrnItemsList";
import { RtrnInvosList } from "./RtrnInvos/RtrnInvosList";
import { LwRtrnForm } from "./components/LwRtrnForm/LwRtrnForm";


//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&     MAIN COMPONENT    &&&&&&&&&&&&&&&//
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function AddItemsAndInvosSTRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const locMethods = useLocStMethods_STRX().AddItemsAndInvos();

  const activeMode = sessionMRV.locSt.page.activeMode1;
  const activeUI = sessionMRV.locSt.page.activeUI3;
  const errorObjRt = sessionMRV.locSt.page.oErrorObjects;
  const activeError1 = sessionMRV.locSt.page.activeError1;
  const activeOverlay1 = sessionMRV.locSt.page.activeOverlay1;

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

  const oOverlays = {
    LwRtrnForm: <LwRtrnForm />,
  };
  const uiActiveOverlay = activeOverlay1 ? oOverlays[activeOverlay1] : null;

  const uiContinueWarning =
    activeError1?.key === "noItems"
      ? errorObjRt?.noItems?.str
      : activeError1?.key === "invalidReturnReasons"
      ? errorObjRt?.invalidReturnReasons?.str
      : "";

  /* ---- SHARED FUNCTIONS ---- */

  const handleContinue = (e) => {
    e.stopPropagation();

    locMethods.continue();
  };

  /* ---- OUTPUT JSX ---- */

  return (
    <>
      {uiActiveOverlay}
      <section className={`addItemsAndInvos mrvPage color__surface__subdued`}>
        <main onClick={locMethods.resetKeysToo} className={`mrvPanel__main`}>
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
    </>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
