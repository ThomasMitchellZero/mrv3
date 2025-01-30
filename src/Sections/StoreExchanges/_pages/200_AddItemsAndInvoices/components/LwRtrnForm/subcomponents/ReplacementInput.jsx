import { useOutletContext } from "react-router-dom";
import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../../mrv/MRVhooks/MRVhooks";

import { MessageRibbonMRV } from "../../../../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

function ReplacementInput({
  sQuery = "No Query",
  aChips = [],
  lsKey = "",
  sIneligible = "No Ineligible Message",
  showOnlyIf = true,
}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const lwLocSt = sessionMRV.locSt.LwRtrnForm;

  const setLwRtrnFormLS = useSetLocStFields("LwRtrnForm");
  const resetLwRtrnFormLS = useResetLocStFields("LwRtrnForm");

  // Chips in UI ///////////////////////


  return (
    // Checks if prerequisite condition is met before returning.
    showOnlyIf && (
      <div className={`vBox minFlex`}>
        
      </div>
    )
  );
}

export { ReplacementInput };
