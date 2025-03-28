import "./ExchEntry.css";

import CWEX_Icon from "../../../../../assets/lowes-icons/App_Icons/CWEX_Icon.png";
import DELX_Icon from "../../../../../assets/lowes-icons/App_Icons/DELX_Icon.png";

import { useNodeNav } from "../../../../mrv_controller";
import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";

function ExchEntry() {
  const nodeNav = useNodeNav();

  const oApps = {
    cwex: {
      icon: CWEX_Icon,
      sTitle: "Carry With Exchanges",
      sDesc: "All Return and Replacement items are physically present.",
      sNavKey: "itemCheck",
    },
    delx: {
      icon: DELX_Icon,
      sTitle: "Delivery Exchanges",
      sDesc: "Return or Replacement items require delivery.",
      sNavKey: "startCWEX",
    },
  };

  function uiAppTile(sKey) {
    return (
      <div
        onClick={() => {
          nodeNav(oApps[sKey].sNavKey);
        }}
        className={`vBox card hasHover appTile align__center`}
      >
        <img src={oApps[sKey].icon} alt={oApps[sKey].sTitle} />
        <h2 className={`heading__medium bold color__primary__text`}>
          {oApps[sKey].sTitle}
        </h2>
        <p className={`body__small color__tertiary__text`}>
          {oApps[sKey].sDesc}
        </p>
      </div>
    );
  }

  return (
    <main className={`mrvPage exchEntry `}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Choose Exchange Type"} />
        <div className={`body`}>
          <div className={`hBox cardContainer align__center justify__center`}>
            {uiAppTile("delx")}
            {uiAppTile("cwex")}
          </div>
        </div>
        <div className={`footer`}></div>
      </div>
    </main>
  );
}

export { ExchEntry };
