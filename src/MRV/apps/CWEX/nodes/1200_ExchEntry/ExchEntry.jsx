import "./ExchEntry.css";

import CWEX_icon from "../../../../../assets/lowes-icons/App_Icons/CWEX_Icon.png";
import DELX_icon from "../../../../../assets/lowes-icons/App_Icons/DELX_Icon.png";

import { useNodeNav } from "../../../../mrv_controller";
import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";

function ExchEntry() {
  const nodeNav = useNodeNav();

  const oApps = {
    cwex: {
      icon: CWEX_icon,
      sTitle: "Carry With Exchanges",
      sDesc: "All Return and Replacement items are physically present.",
    },
    delx: {
      icon: DELX_icon,
      sTitle: "Delivery Exchanges",
      sDesc: "Return or Replacement items require delivery.",
    },
  };

  return (
    <main className={`mrvPage `}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Choose Exchange Type"} />
        <div className={`body`}>
          <div className={`vBox align__center`}></div>
        </div>
      </div>
    </main>
  );
}

export { ExchEntry };
