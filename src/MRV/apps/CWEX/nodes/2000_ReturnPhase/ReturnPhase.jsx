import "./ReturnPhase.css";

import { useState, useRef } from "react";
import { useNodeNav } from "../../../../mrv_controller";
import { useOutlet, useOutletContext } from "react-router-dom";

import { dLocalCtx, dError, oBaseLocState } from "../../../../mrv_data_types";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";

import { ProductList } from "./return_phase_comps/body_product_list/ProductList";
import { ReceiptsList } from "./return_phase_comps/body_receipts_list/ReceiptsList";
import { SidesheetIndex } from "./return_phase_comps/sidesheet_index/SidesheetIndex";
import { ReturnProdDetailsAside } from "./return_phase_comps/sidesheet_product_details/ReturnProdDetailsAside";
import { LifetimeWarranty } from "./return_phase_comps/lifetime_warranty/LifetimeWarranty";

function ReturnPhase() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const oDerived = mrvCtx.oDerived;
  const nodeNav = useNodeNav();

  // Page Configs ///////////////////////////////////////////////////

  const initPageLS = {
    ...oBaseLocState,
    sActiveOverlay: "",
    sMode: "items",
    sActiveProdKey: "",
    sActiveInvoKey: "",
  };

  const oPage = dLocalCtx({
    oInitLS: initPageLS,
    oResets: {
      errorOnly: {
        sActiveError: initPageLS.sActiveError,
      },
      allActive: {
        sActiveProdKey: initPageLS.sActiveProdKey,
        sActiveInvoKey: initPageLS.sActiveInvoKey,
        sActiveError: initPageLS.sActiveError,
      },
      overlay: {
        sActiveOverlay: initPageLS.sActiveOverlay,
        sActiveError: initPageLS.sActiveError,
      },
    },
    oErrorObjects: {
      invalidReceipt: dError({
        sKey: "invalidReceipt",
        sMessage: "Invalid receipt #",
      }),
      duplicateReceipt: dError({
        sKey: "duplicateReceipt",
        sMessage: "Receipt already added",
      }),
      invalidItem: dError({
        sKey: "invalidItem",
        sMessage: "Invalid Item #",
      }),
      invalidQty: dError({
        sKey: "invalidQty",
        sMessage: "Invalid quantity",
      }),
    },
  });

  const oPageLS = oPage.oLocalState;
  const fSetPageLS = oPage.fSetLocalState;
  const oResets = oPage.oResets;

  ///////////////////////////////////////////////////////////////////
  // Page Logic
  ///////////////////////////////////////////////////////////////////

  const handleContinue = () => {
    const sError = false;
    const iUnmatched = Object.keys(oDerived.oNRRitems).length;

    if (sError) {
      return;
    }

    if (iUnmatched > 0) {
      nodeNav("returnRejects");
      return;
    }

    nodeNav("newItemPhase");
  };

  ///////////////////////////////////////////////////////////////////
  // UI Sidesheets
  ///////////////////////////////////////////////////////////////////

  const sAsideKey =
    oPageLS.sActiveProdKey && oPageLS.sMode === "items"
      ? "itemDetails"
      : "index";

  const oAsides = {
    index: <SidesheetIndex oPage={oPage} />,
    itemDetails: <ReturnProdDetailsAside oPage={oPage} />,
  };

  ///////////////////////////////////////////////////////////////////
  // UI Main Panel
  ///////////////////////////////////////////////////////////////////

  const sModeKey = oPageLS.sMode || "items";

  const oMainPanels = {
    items: {
      ui: <ProductList oPage={oPage} />,
      sTitle: "Items Being Returned",
    },
    receipts: { ui: <ReceiptsList oPage={oPage} />, sTitle: "Receipts List" },
  };

  ///////////////////////////////////////////////////////////////////
  //  Overlays
  ///////////////////////////////////////////////////////////////////

  const oActiveOverlay = {
    lw: <LifetimeWarranty oPage={oPage} />,
  };

  const uiOverlay = oPageLS.sActiveOverlay
    ? oActiveOverlay[oPageLS.sActiveOverlay]
    : null;

  ///////////////////////////////////////////////////////////////////
  //  Export Component
  ///////////////////////////////////////////////////////////////////

  return (
    <main
      onClick={() => {
        fSetPageLS({ ...oPageLS, ...oResets.allActive });
      }}
      className={`mrvPage returnPhase`}
    >
      {uiOverlay}
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={oMainPanels[sModeKey].sTitle} />
        <div className={`body`}>{oMainPanels[sModeKey].ui}</div>
        <FooterCWEX fBtnAction={handleContinue} />
      </div>
      {oAsides[sAsideKey]}
    </main>
  );
}

export { ReturnPhase };
