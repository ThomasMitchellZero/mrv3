import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";

import { BaseSidesheet_MRV } from "../../../../mrv/mrv-components/DisplayOutputs/BaseSidesheet_MRV";

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
        <div className={`main_content gap2rem alignLeft`}>
          <button
            type="button"
            onClick={() => {
              nodeNav("replacementCheck");
            }}
            className={`mrvBtn primary`}
          >
            Test Scenario 1
          </button>
        </div>
      </section>
      <BaseSidesheet_MRV title="Fartrell Cluggins, Mississippi State" btnIcon={`close`} />
    </section>
  );
}

export { StartSTRX };

/*



*/
