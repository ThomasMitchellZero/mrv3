import "./_AddItemsAndInvosSTRX.css";

import { useLocStMethods_STRX } from "../../_resources/components/CompHooks_STRX";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";

import { baseLocState } from "../../../../globalFunctions/globalJS_classes";

import { AllEntry30 } from "./AllEntry30";
import { ItemDetails30STRX } from "../../_resources/components/ItemDetails30STRX";

import {
  useNodeNav,
  useClearLocErrStates,
} from "../../../../mrv/MRVhooks/MRVhooks";

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
  const locStRt = sessionMRV.locSt;
  const locMethods = useLocStMethods_STRX();

  const activeMode = locStRt.page.activeMode1;
  const activeUI = locStRt.page.activeUI3;

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
      <div className={"buttonBox25 warning"}>{"FaRT warning"}</div>
    </div>
  );

  /* ---- SHARED FUNCTIONS ---- */

  const refBaseLocState = baseLocState;

  const handleContinue = (e) => {
    e.stopPropagation();

    if (locStRt.page.activeMode3 === "receipt") {
      locMethods.entryTabClick({ keyStr: "item" });
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
        {locStRt.page.errorSt1 === "noItem" ? uiContinueWarning : null}
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
