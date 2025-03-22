import "./ReturnPhase_style.css";

import { useState, useContext } from "react";
import { useNodeNav } from "../../../../mrv_controller";
import { useOutlet, useOutletContext } from "react-router-dom";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { SidesheetMRV } from "../../../../components/layout/sidesheet/SidesheetMRV";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";

import { ReturnPhase_locState } from "./ReturnPhase_schemas";
import { SidesheetIndex } from "./components/sidesheet_index/SidesheetIndex";

function ReturnPhase() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;

  const [lsReturnPhase, setReturnPhase] = useState(ReturnPhase_locState);

  const oSidesheet = {
    index: (
      <SidesheetIndex pageLS={lsReturnPhase} fSetPageLS={setReturnPhase} />
    ),
    itemDetails: null,
  };

  const activeSidesheet = oSidesheet[lsReturnPhase.sMode || "index"];

  return (
    <main className={`mrvPage returnPhase`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Return Phase"} />
        <div className={`body`}></div>
        <FooterCWEX />
      </div>
      {activeSidesheet}
    </main>
  );
}

export { ReturnPhase };
