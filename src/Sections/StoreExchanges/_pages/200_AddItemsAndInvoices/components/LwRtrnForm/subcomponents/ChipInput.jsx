import { useOutletContext } from "react-router-dom";
import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../../mrv/MRVhooks/MRVhooks";

import { MessageRibbonMRV } from "../../../../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

function ChipInput({
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

  const ref_oChip = { label: "Str", chipKey: "str", lwValid: true };

  const uiLwChip = ({ oChip, lsKey }) => {
    const selectedLsKey = lwLocSt[lsKey]?.chipKey;
    const isSelected = selectedLsKey === oChip.chipKey ? "selected" : "";

    const handleChipClick = (oChip) => {
      const outLsValue = lwLocSt[lsKey]?.chipKey === oChip.chipKey ? "" : oChip;
      setLwRtrnFormLS({ [lsKey]: outLsValue });
    };

    return (
      <button
        key={oChip.chipKey}
        className={`chip ${isSelected}`}
        onClick={() => handleChipClick(oChip)}
      >
        {oChip.label}
      </button>
    );
  };

  // If a chip is selected && invalid, show the invalid message.
  const invalidSelection = lwLocSt?.[lsKey]?.lwValid === false;

  const aUiChip = aChips.map((oChip) => {
    return uiLwChip({ oChip, lsKey });
  });

  const uiInvalidMsg = invalidSelection ? (
    <MessageRibbonMRV message={sIneligible} />
  ) : null;

  return (
    // Checks if prerequisite condition is met before returning.
    showOnlyIf && (
      <div className={`vBox minFlex`}>
        <p className={`body__small color__secondary__text`}>{sQuery}</p>
        <div className={`chipCtnr`}>{aUiChip}</div>
        {uiInvalidMsg}
      </div>
    )
  );
}

export { ChipInput };
