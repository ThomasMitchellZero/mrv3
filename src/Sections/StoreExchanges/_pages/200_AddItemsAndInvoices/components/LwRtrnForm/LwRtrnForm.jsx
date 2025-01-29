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

  const oEvals = {};

  // Chips in UI ///////////////////////

  const oBrand = {
    aChips: [
      { label: "Kobalt", chipKey: "kobalt", lwValid: true },
      { label: "Craftsman", chipKey: "craftsman", lwValid: true },
      { label: "Other", chipKey: "other", lwValid: false },
    ],
    lsKey: "input1",
    sIneligible: "This brand isn't eligible for Lifetime Warranty replacement.",
    isVisible: true,
  };

  const oElectrical = {
    aChips: [
      { label: "Yes", chipKey: "yes", lwValid: false },
      { label: "No", chipKey: "no", lwValid: true },
    ],
    lsKey: "input2",
    sIneligible:
      "Electrical items aren't eligible for Lifetime Warranty replacement.",
    isVisible: lwLocSt?.input1.lwValid,
  };

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

  const arrayChipper = ({ chipsObj }) => {
    const lsKey = chipsObj.lsKey;
    // If a chip is selected && invalid, show the invalid message.
    const invalidSelection = lwLocSt?.[lsKey]?.lwValid === false;

    const aUiChip = chipsObj.aChips.map((oChip) => {
      return uiLwChip({ oChip, lsKey });
    });

    const uiInvalidMsg = invalidSelection ? (
      <MessageRibbonMRV message={chipsObj.sIneligible} />
    ) : null;

    return (
      <div className={`vBox`}>
        <div className={`chipCtnr`}>{aUiChip}</div>
        {uiInvalidMsg}
      </div>
    );
  };

  const uiBrandChips = arrayChipper({
    chipsObj: oBrand,
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
