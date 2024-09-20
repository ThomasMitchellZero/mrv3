import "./ReplacementCheck.css";

import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { useImmer } from "use-immer";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";
import { ProductImageMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ProductImageMRV";
import { returnAtom } from "../../../../globalFunctions/globalJS_classes";
import { MessageRibbonMRV } from "../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

function ReplacementCheck() {
  const nodeNav = useNodeNav();

  const defaultState = { activePanel: "askCustomer" };

  const [locStReplCheck, setLocStReplCheck] = useImmer(defaultState);

  /* ---- SHARED FUNCTIONS ---- */

  const askCustomer = (
    <>
      <div className={`heading__large color__primary__text`}>
        Does the customer have the replacement items they want to get?
      </div>
      <div className={`hBox minFlex gap2rem`}>
        <button
          type="button"
          onClick={() => {
            setLocStReplCheck((draft) => {
              draft.activePanel = "banishCustomer";
            });
          }}
          className={`mrvBtn maxFlex secondary`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => {
            nodeNav("returns");
          }}
          className={`mrvBtn maxFlex primary`}
        >
          Yes
        </button>
      </div>
    </>
  );

  const banishCustomer = (
    <>
      <div className={`heading__large color__primary__text`}>
        {`1. Ask customer to get their replacement items.`}
      </div>
      <div className={`heading__large color__primary__text`}>
        {`2. Offer to hold the items being brought back.`}
      </div>
      <div className={`heading__large color__primary__text`}>
        {`3. (Optional) They can skip the line when they get back.`}
      </div>
      <div className={`hBox minFlex gap2rem`}>
        <button
          type="button"
          onClick={() => {
            nodeNav("testScenarios");
          }}
          className={`mrvBtn maxFlex primary`}
        >
          OK
        </button>
      </div>
    </>
  );

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main replacementCheck`}>
        <TitleBarSTRX
          showNavNodeBar={true}
          headerTitle={"Replacement Items With Customer"}
        ></TitleBarSTRX>
        <div className={`maxWidth`}>
          <MessageRibbonMRV
            message={`Currently, Return Items must be exchanged for identical New Items.`}
            type="alert"
          />
        </div>
        <div className={`main_content gap2rem`}>
          {locStReplCheck.activePanel === "banishCustomer"
            ? banishCustomer
            : askCustomer}
        </div>
      </section>
    </section>
  );
}

export { ReplacementCheck };

/*

*/
