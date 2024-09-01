import "./_AddItemsAndInvosSTRX.css";

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

  const uiContinueWarning = (
    <div className={`footer_text`}>
      <div className={"buttonBox25 warning"}>{"TBD"}</div>
    </div>
  );

  /* ---- SHARED FUNCTIONS ---- */


  const handleContinue = (e) => {
    e.stopPropagation();

    if (activeMode === "receipt") {
      locMethods.entryTabClick({ keyStr: "item" });
      console.log("itemmmmm");
    } else if (sessionMRV.returnItems.length === 0) {
      setSessionMRV((draft) => {
        draft.locSt.page.errorSt1 = "noItem";
      });
    } else {
      nodeNav("reason");
    }
  };

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`addItemsAndInvos mrvPage color__surface__subdued`}>
      <main onClick={locMethods.bgClick} className={`mrvPanel__main`}>
        <TitleBarSTRX
          //hasIcon={"back"}
          showProductName={true}
          headerTitle={oMode[activeMode].s70label}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>{oMode[activeMode].s70panel}</div>
        {sessionMRV.locSt.page.errorSt1 === "noItem" ? uiContinueWarning : null}
        <div className={`footer_content`}>
          <CashTotalSTRX />
          <div className={`buttonBox25`}>
            <button
              className={`primary jumbo maxFlex`}
              onClick={(e) => {
                handleContinue(e);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
      {o30panels[activeUI]}
    </section>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
