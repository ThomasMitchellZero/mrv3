import "./ReturnPhase_style.css";

import { useState, useContext } from "react";
import { useNodeNav } from "../../../../mrv_controller";
import { useOutlet, useOutletContext } from "react-router-dom";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { SidesheetMRV } from "../../../../components/layout/sidesheet/SidesheetMRV";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";

function ReturnPhase() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;

  const [lsReturnPhase, setReturnPhase] = useState([]);

  return (
    <main className={`mrvPage returnPhase`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Return Phase"} />
        <div className={`body`}></div>
        <FooterCWEX />
      </div>
    </main>
  );
}

export { ReturnPhase };
