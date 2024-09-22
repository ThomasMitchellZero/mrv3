import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ColumnLabelMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ColumnLabelMRV/ColumnLabelMRV";

import { Sidesheet_Base_MRV } from "../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

function StartSTRX() {
  const nodeNav = useNodeNav();

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarSTRX
          showNavNodeBar={true}
          headerTitle={"Choose Scenario"}
        ></TitleBarSTRX>
        <div className={`main_content gap2rem alignLeft padding__vertical`}>
          <button
            type="button"
            onClick={() => {
              nodeNav("replacementCheck");
            }}
            className={`mrvBtn primary`}
          >
            Test Scenario 1
          </button>
          <ColumnLabelMRV iconStr="cart" bigLabel="" />
        </div>
      </section>
    </section>
  );
}

export { StartSTRX };

/*



*/
