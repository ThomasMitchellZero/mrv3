import "./ReturnPhase_style.css";

import { useState, useRef } from "react";
import { useNodeNav, fInitResetLS } from "../../../../mrv_controller";
import { useOutlet, useOutletContext } from "react-router-dom";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";
import { SidesheetIndex } from "./components/sidesheet_index/SidesheetIndex";

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

  const oSidesheet = {
    index: <SidesheetIndex oPage={oPage} />,
    itemDetails: null,
  };

  const activeSidesheet = oSidesheet[oPageLS.sMode] || oSidesheet["index"];

  // UI Main Panel ///////////////////////////////////////////////////

  const sPageTitle =
    oPageLS.sMode === "items" ? "Items Being Returned" : "Receipts List";

  const oMainPanels = {
    items: <ProductList oPage={oPage} />,
    receipts: <ReceiptsList oPage={oPage} />,
  };

  const uiMainPanel = oMainPanels[oPageLS.sMode] || oMainPanels["items"];

  return (
    <main
      onClick={() => {
        fSetPageLS({ ...oPageLS, ...oResets.allActive });
      }}
      className={`mrvPage returnPhase`}
    >
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={sPageTitle} />
        <div className={`body`}>{uiMainPanel}</div>
        <FooterCWEX />
      </div>
      {activeSidesheet}
    </main>
  );
}

export { ReturnPhase };
