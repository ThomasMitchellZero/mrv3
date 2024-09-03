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
} from "../../../../globalFunctions/globalJS_classes";

import { AllEntry30 } from "./AllEntry30";
import { ItemDetails30STRX } from "../../_resources/components/ItemDetails30STRX";

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
  const locMethods = useLocStMethods_STRX();

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

  const o30panels = {
    AllEntry30: <AllEntry30 />,
    ItemDetails30: <ItemDetails30STRX stateItemArr="returnItems" />,
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
      <main onClick={locMethods.clearDataToo} className={`mrvPanel__main`}>
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
      {o30panels[activeUI]}
    </section>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
