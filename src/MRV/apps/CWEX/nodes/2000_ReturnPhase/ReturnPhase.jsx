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

  const [lsReturnPhase, setReturnPhase] = useState(initPageLS);
  const oPageLSRef = useRef(lsReturnPhase);

  const fUpdatePageLS = (pageLSdraft) => {
    oPageLSRef.current = pageLSdraft;
    setReturnPhase(pageLSdraft);
  };

  const oPage = dPage({
    oInitLS: initPageLS,
    oPageLS: lsReturnPhase,
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
    fSetPageLS: fUpdatePageLS,
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

  const activeSidesheet =
    oSidesheet[lsReturnPhase.sMode] || oSidesheet["index"];

  // UI Main Panel ///////////////////////////////////////////////////

  const sPageTitle =
    lsReturnPhase.sMode === "items" ? "Items Being Returned" : "Receipts List";

  const oMainPanels = {
    items: <ProductList oPage={oPage} />,
    receipts: <ReceiptsList oPage={oPage} />,
  };

  const uiMainPanel = oMainPanels[lsReturnPhase.sMode] || oMainPanels["items"];

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
