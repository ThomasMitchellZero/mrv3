import "./ReturnPhase_style.css";

import { useState, useRef } from "react";
import { useNodeNav } from "../../../../mrv_controller";
import { useOutlet, useOutletContext } from "react-router-dom";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";
import { SidesheetIndex } from "./components/sidesheet_index/SidesheetIndex";
import { ReturnProdDetailsAside } from "./components/sidesheet_product_details/ReturnProdDetailsAside";

import { ProductList } from "./components/body_product_list/ProductList";
import { ReceiptsList } from "./components/body_receipts_list/ReceiptsList";
import { cloneDeep } from "lodash";
import { dPage, dError, oBaseLocState } from "../../../../mrv_data_types";

function ReturnPhase() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;

  // Page Configs ///////////////////////////////////////////////////

  const initPageLS = {
    ...oBaseLocState,
    sMode: "receipts",
    sActiveDataKey: "",
  };

  const oPage = dPage({
    oInitLS: initPageLS,
    oResets: {
      errorOnly: {
        sActiveError: initPageLS.sActiveError,
      },
      allActive: {
        sActiveDataKey: initPageLS.sActiveDataKey,
        sActiveError: initPageLS.sActiveError,
      },
    },
    oPageMethods: {},
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

  const oPageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;
  const oResets = oPage.oResets;

  // UI Sidesheets ///////////////////////////////////////////////////
  const sAsideKey =
    oPageLS.sActiveDataKey && oPageLS.sMode === "items"
      ? "itemDetails"
      : "index";

  const oAsides = {
    index: <SidesheetIndex oPage={oPage} />,
    itemDetails: <ReturnProdDetailsAside oPage={oPage} />,
  };

  // UI Main Panel ///////////////////////////////////////////////////

  const sModeKey = oPageLS.sMode || "items";

  const oMainPanels = {
    items: { ui: <ProductList oPage={oPage} />, title: "Items Being Returned" },
    receipts: { ui: <ReceiptsList oPage={oPage} />, title: "Receipts List" },
  };

  return (
    <main
      onClick={() => {
        fSetPageLS({ ...oPageLS, ...oResets.allActive });
      }}
      className={`mrvPage returnPhase`}
    >
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={oMainPanels[sModeKey].sTitle} />
        <div className={`body`}>{oMainPanels[sModeKey].ui}</div>
        <FooterCWEX />
      </div>
      {oAsides[sAsideKey]}
    </main>
  );
}

export { ReturnPhase };
