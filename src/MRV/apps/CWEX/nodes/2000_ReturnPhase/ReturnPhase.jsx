import "./ReturnPhase_style.css";

import { useState, useContext } from "react";
import { useNodeNav } from "../../../../mrv_controller";
import { useOutlet, useOutletContext } from "react-router-dom";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { SidesheetMRV } from "../../../../components/layout/sidesheet/SidesheetMRV";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";

import { ReturnPhase_locState } from "./ReturnPhase_schemas";
import { SidesheetIndex } from "./components/sidesheet_index/SidesheetIndex";

import { ItemsList } from "./components/body_items_list/ItemsList";
import { ReceiptsList } from "./components/body_receipts_list/ReceiptsList";

function ReturnPhase() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;

  const [lsReturnPhase, setReturnPhase] = useState(ReturnPhase_locState);

  // UI Sidesheets ///////////////////////////////////////////////////

  const oSidesheet = {
    index: (
      <SidesheetIndex pageLS={lsReturnPhase} fSetPageLS={setReturnPhase} />
    ),
    itemDetails: null,
  };

  const activeSidesheet =
    oSidesheet[lsReturnPhase.sMode] || oSidesheet["index"];

  // UI Main Panel ///////////////////////////////////////////////////

  const oMainPanels = {
    items: <ItemsList />,
    receipts: null,
  };

  return (
    <main className={`mrvPage returnPhase`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Items Being Returned"} />
        <div className={`body`}>
          <ItemsList />
        </div>
        <FooterCWEX />
      </div>
      {activeSidesheet}
    </main>
  );
}

export { ReturnPhase };
