import "./NewItems.css";

import { ContinueBtnMRV } from "../../../../mrv/mrv-components/inputs/ContinueBtnMRV";
import { ScanScreenMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { NewItemActionsSTRX } from "./Sidesheet/NewItemActionsSTRX";
import { NewItemsList } from "./NewItemsList/NewItemsList";
import { NewItemProdInfoSTRX } from "./Sidesheet/NewItemProdInfoSTRX";

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

import { useNodeNav, primaryAtomizer } from "../../../../mrv/MRVhooks/MRVhooks";

import { useContext } from "react";

import { useOutletContext } from "react-router";

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&     MAIN COMPONENT    &&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function NewItems() {
  const nodeNav = useNodeNav();
  const locMethods = useLocStMethods_STRX().NewItems();
  const productCtx = useContext(ProductContext);

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const activeUI3 = sessionMRV.locSt.page.activeUI3;
  const activeError1 = sessionMRV.locSt.page.activeError1;

  const activeErrorStr = activeError1?.str || "";

  const oMode = {};

  const o30panels = {
    ActionsSTRX: <NewItemActionsSTRX />,
    NewItemEntrySTRX: <NewItemEntrySTRX />,
    NewItemProdInfoSTRX: <NewItemProdInfoSTRX />,
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

  // check for unpaired items.  This affects the route for the Continue button.
  const atomizedForPeers = primaryAtomizer({
    repo1: sessionMRV.returnItems,
    repo2: sessionMRV.newItems,
    comparisonFn: ({ repo1Atom, repo2Atom }) => {
      return repo1Atom.atomItemNum === repo2Atom.atomItemNum;
    },
  });

  console.log(atomizedForPeers);

  const returnUnpaired = atomizedForPeers.aUnmerged1;
  const newUnpaired = atomizedForPeers.aUnmerged2;
  const hasUnpaired = returnUnpaired.length > 0 || newUnpaired.length > 0;

  const navRt = hasUnpaired ? "unpaired" : "totalReview";

  const handleContinue = (e) => {
    e.stopPropagation();
    if (hasUnpaired) {
      locMethods.basicClear();
    }
    nodeNav(navRt);
  };

  return (
    <section className={`newItems mrvPage color__surface__subdued`}>
      <main
        onClick={() => {
          locMethods.basicClear();
        }}
        className={`mrvPanel__main`}
      >
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

export { NewItems };
