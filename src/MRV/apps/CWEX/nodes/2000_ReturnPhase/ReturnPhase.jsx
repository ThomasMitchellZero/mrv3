import "./ReturnPhase_style.css";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { SidesheetMRV } from "../../../../components/layout/sidesheet/SidesheetMRV";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";

function ReturnPhase() {
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
