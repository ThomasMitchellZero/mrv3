import { useOutletContext } from "react-router-dom";
import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../mrv/MRVhooks/MRVhooks";

import { MessageRibbonMRV } from "../../../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

import { Sidesheet_Base_MRV } from "../../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

function LwRtrnForm() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const lwLocSt = sessionMRV.locSt.LwRtrnForm;

  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");
  const setLwRtrnFormLS = useSetLocStFields("LwRtrnForm");
  const resetLwRtrnFormLS = useResetLocStFields("LwRtrnForm");

  const oEvals = {
    
  };

  // Chips in UI ///////////////////////


  const aBrandChips = [
    { label: "Kobalt", chipKey: "kobalt", lwValid: true },
    { label: "Craftsman", chipKey: "craftsman", lwValid: true },
    { label: "Other", chipKey: "other", lwValid: false },
  ];
  const sBrandIneligible =
    "This brand isn't eligible for Lifetime Warranty replacement.";

  const aElectricalChips = [
    { label: "Yes", chipKey: "yes", lwValid: false },
    { label: "No", chipKey: "no", lwValid: true },
  ];
  const sElectricalIneligible =
    "Electrical items aren't eligible for Lifetime Warranty replacement.";

  const handleChipClick = ({ oChip, lsKey }) => {
    const outLsValue = lwLocSt[lsKey]?.chipKey === oChip.chipKey ? "" : oChip;
    setLwRtrnFormLS({ [lsKey]: outLsValue });
  };

  const uiLwChip = ({ oChip, lsKey }) => {
    const selectedLsKey = lwLocSt[lsKey]?.chipKey;
    const isSelected = selectedLsKey === oChip.chipKey ? "selected" : "";
    return (
      <button
        key={oChip.chipKey}
        className={`chip ${isSelected}`}
        onClick={() => handleChipClick({ oChip, lsKey })}
      >
        {oChip.label}
      </button>
    );
  };

  const arrayChipper = ({ array, lsKey, sIneligible = "EMPTY" }) => {
    const aUiChip = array.map((oChip) => {
      return uiLwChip({ oChip, lsKey });
    });
    const lwValidMsg = lwLocSt?.[lsKey].lwValid ? null : (
      <MessageRibbonMRV message={sIneligible} />
    );
    return (
      <div className={`vBox`}>
        <div className={`chipCtnr`}>{aUiChip}</div>
        {lwValidMsg}
      </div>
    );
  };

  const uiBrandChips = arrayChipper({
    array: aBrandChips,
    lsKey: "input1",
    sIneligible: sBrandIneligible,
  });

  return (
    <div
      onClick={() => {
        resetPageLS({ activeOverlay1: true });
      }}
      className={`scrimOverlay justifyEnd`}
    >
      <Sidesheet_Base_MRV title="Lifetime Warranty Item">
        {uiBrandChips}
      </Sidesheet_Base_MRV>
    </div>
  );
}

export { LwRtrnForm };
