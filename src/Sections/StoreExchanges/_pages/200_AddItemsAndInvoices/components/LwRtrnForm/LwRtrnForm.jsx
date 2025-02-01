import "./LwRtrnForm.css";
import { useOutletContext } from "react-router-dom";
import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../mrv/MRVhooks/MRVhooks";

import { Sidesheet_Base_MRV } from "../../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

import { ChipInput } from "./subcomponents/ChipInput";
import { ReplacementCluster } from "./subcomponents/ReplacementCluster";

function LwRtrnForm() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const lwLocSt = sessionMRV.locSt.LwRtrnForm;

  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");
  const setLwRtrnFormLS = useSetLocStFields("LwRtrnForm");
  const resetLwRtrnFormLS = useResetLocStFields("LwRtrnForm");

  const handleBGClick = (e) => {
    resetLwRtrnFormLS({ activeErrorALL: true });
  };

  // validity conditions to set visibility.
  const bBrandValid = lwLocSt?.input1?.lwValid === true;
  const bElectricityValid = bBrandValid && lwLocSt?.input2?.lwValid === true;
  const bRtrnQtyValid = bElectricityValid && Number(lwLocSt?.input3) > 0;

  const handleRtrnInput = (event) => {
    const newQty = Number(event.target.value);
    setLwRtrnFormLS({ input3: newQty });
  };

  const handlePlus = () => {
    const newQty = Number(lwLocSt.input3) + 1;
    setLwRtrnFormLS({ input3: newQty });
  };

  const handleMinus = () => {
    const newQty = Math.max(Number(lwLocSt.input3) - 1, 0);
    setLwRtrnFormLS({ input3: newQty });
  };

  const uiReturnInput = bElectricityValid && (
    <div className={`vBox minFlex gap50pct`}>
      <div className={`hBox body__small color__primary__text`}>
        Return Item Qty
      </div>
      <div className={`qtyInputPlusMinusCtnr`}>
        <button
          onClick={handleMinus}
          disabled={!bRtrnQtyValid}
          className={`ghost`}
        >
          -
        </button>
        <input
          type="number"
          value={lwLocSt.input3}
          min={0}
          onChange={(e) => {
            handleRtrnInput(e);
          }}
        />
        <button onClick={handlePlus} className={`ghost`}>
          +
        </button>
      </div>
    </div>
  );

  // Final Output
  return (
    <div
      onClick={() => {
        resetPageLS({ activeOverlay1: true });
        resetLwRtrnFormLS({ EVERYONE: true });
      }}
      className={`LwRtrnForm scrimOverlay justifyEnd`}
    >
      <Sidesheet_Base_MRV
        fBgClick={handleBGClick}
        title="Lifetime Warranty Item"
      >
        <div className={`vBox minFlex gap1rem`}>
          <div className={`vBox minFlex gap1rem`}>
            {/*Chip Inputs*/}
            <ChipInput
              sQuery="Return Item Brand"
              aChips={[
                { label: "Kobalt", chipKey: "kobalt", lwValid: true },
                { label: "Craftsman", chipKey: "craftsman", lwValid: true },
                { label: "Other", chipKey: "other", lwValid: false },
              ]}
              lsKey="input1"
              sIneligible="This brand isn't eligible for Lifetime Warranty replacement."
            />
            <ChipInput
              sQuery="Does item use electricity?"
              aChips={[
                { label: "Yes", chipKey: "yes", lwValid: false },
                { label: "No", chipKey: "no", lwValid: true },
              ]}
              lsKey="input2"
              sIneligible="Electrical items aren't eligible for Lifetime Warranty replacement."
              showOnlyIf={lwLocSt?.input1.lwValid === true}
            />
            {uiReturnInput}
          </div>
          <ReplacementCluster showOnlyIf={bRtrnQtyValid} />
        </div>
      </Sidesheet_Base_MRV>
    </div>
  );
}

export { LwRtrnForm };
