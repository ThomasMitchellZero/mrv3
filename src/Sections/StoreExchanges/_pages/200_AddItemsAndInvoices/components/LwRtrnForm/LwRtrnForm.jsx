import "./LwRtrnForm.css";
import { useOutletContext } from "react-router-dom";
import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../mrv/MRVhooks/MRVhooks";

import { Sidesheet_Base_MRV } from "../../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

import { ChipInput } from "./subcomponents/ChipInput";
import { ReplacementInput } from "./subcomponents/ReplacementInput";

function LwRtrnForm() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const lwLocSt = sessionMRV.locSt.LwRtrnForm;

  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");
  const setLwRtrnFormLS = useSetLocStFields("LwRtrnForm");
  const resetLwRtrnFormLS = useResetLocStFields("LwRtrnForm");

  // Final Output

  const bBrandValid = lwLocSt?.input1?.lwValid === true;
  const bElectricityValid = lwLocSt?.input2?.lwValid === true;
  const bReplacementInputVisible = bBrandValid && bElectricityValid;

  return (
    <div
      onClick={() => {
        resetPageLS({ activeOverlay1: true });
      }}
      className={`LwRtrnForm scrimOverlay justifyEnd`} 
    >
      <Sidesheet_Base_MRV title="Lifetime Warranty Item">
        <div className={`vBox minFlex`}>
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
        </div>
        <ReplacementInput showOnlyIf={bReplacementInputVisible} />
      </Sidesheet_Base_MRV>
    </div>
  );
}

export { LwRtrnForm };
