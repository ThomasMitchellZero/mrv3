import "./NewItems.css";

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

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&     MAIN COMPONENT    &&&&&&&&&&&&&&&//
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const NewItemsSTRX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();
  const locMethods = useLocStMethods_STRX()

  const activeMode = sessionMRV.locSt.page.activeMode1;
  const activeUI = sessionMRV.locSt.page.activeUI3;
  const errorObjRt = sessionMRV.locSt.page.oErrorObjects;
  const activeError1 = sessionMRV.locSt.page.activeError1;

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

  /* ---- SHARED FUNCTIONS ---- */

  const handleContinue = (e) => {
    e.stopPropagation();
  };

  /*



*/

  return (
    <section className={`addItemsAndInvos mrvPage color__surface__subdued`}>
      <main onClick={locMethods.resetKeysToo} className={`mrvPanel__main`}>
        <TitleBarSTRX
          showProductName={true}
          headerTitle={`New Items For Exchange`}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>All will be remade anew.</div>

        <div className={`footer_content`}>
          <CashTotalSTRX />
          <ContinueBtnMRV
            warningText={uiContinueWarning}
            handleClick={(e) => handleContinue(e)}
          />
        </div>
      </main>
    </section>
  );
};

export { NewItemsSTRX };
