import "./ItemCheck_style.css";

import { useNodeNav } from "../../../../mrv_controller";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { SidesheetMRV } from "../../../../components/layout/sidesheet/SidesheetMRV";

function ItemCheck() {
  const nodeNav = useNodeNav();

  return (
    <main className={`mrvPage itemCheck`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Item Check"} />
        <div className={`body`}>
          <div className={`vBox query justify__center gap__2rem`}>
            <div
              className={`hBox flex__min gap__1rem heading__medium color__text__primary`}
            >
              Does customer have all items they wish to return and receive in
              this exchange?
            </div>
            <div className={`hBox flex__min gap__2rem`}>
              <button className={`secondary flex__max`}>No</button>
              <button
                className={`primary flex__max`}
                onClick={() => nodeNav("returnPhase")}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
        <div className={`footer`}></div>
      </div>
      <SidesheetMRV sTitle={"Lifetime Warranty Items"}>
        <ul
          className={`vBox width__max body__small color__primary__text flex__min`}
        >
          <li>
            Lifetime Warranty items can be exchanged without receipt for an
            <b className="bold"> identical</b> replacement.
          </li>
          <li>
            If unavailable, the customer may choose an
            <b className="bold"> equivalent</b> replacement.
          </li>
        </ul>
      </SidesheetMRV>
    </main>
  );
}

export { ItemCheck };
