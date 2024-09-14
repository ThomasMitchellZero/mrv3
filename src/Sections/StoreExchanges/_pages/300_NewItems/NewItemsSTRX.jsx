import "./NewItems.css";

import { ContinueBtnMRV } from "../../../../mrv/mrv-components/inputs/ContinueBtnMRV";
import { ScanScreenMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { ActionsSTRX } from "./Sidesheet/ActionsSTRX";
import { NewItemsList } from "./NewItemsList/NewItemsList";

import { NewItemEntrySTRX } from "./Sidesheet/NewItemEntrySTRX";
import ProductContext from "../../../../store/product-context";

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

import { useContext } from "react";

import { useOutletContext } from "react-router";

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&     MAIN COMPONENT    &&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function NewItemsSTRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locMethods = useLocStMethods_STRX();
  const productCtx = useContext(ProductContext);

  const activeUI3 = sessionMRV.locSt.page.activeUI3;
  const activeError1 = sessionMRV.locSt.page.activeError1;

  const activeErrorStr = activeError1?.str || "";

  const oMode = {};

  const active70key =
    sessionMRV.newItems.length > 0 ? "newItemsList" : "scanScreen";

  const o30panels = {
    ActionsSTRX: <ActionsSTRX />,
    NewItemEntrySTRX: <NewItemEntrySTRX />,
  };

  const o70panels = {
    newItemsList: <div className={`newItemsList`}></div>,
    scanScreen: (
      <ScanScreenMRV
        mainTitle={`Scan or Add New Items`}
        subtitle={`Customer receives new items when exchange is complete.`}
        iconStr={`cart`}
      />
    ),
  };

  /* ---- SHARED FUNCTIONS ---- */

  const handleContinue = (e) => {
    e.stopPropagation();
  };

  return (
    <section className={`addItemsAndInvos mrvPage color__surface__subdued`}>
      <main onClick={() => {}} className={`mrvPanel__main`}>
        <TitleBarSTRX
          showProductName={true}
          headerTitle={`New Items For Exchange`}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>
          <NewItemsList />
        </div>

        <div className={`footer_content`}>
          <CashTotalSTRX />
          <ContinueBtnMRV handleClick={(e) => handleContinue(e)} />
        </div>
      </main>
      {o30panels[activeUI3]}
    </section>
  );
}

export { NewItemsSTRX };
