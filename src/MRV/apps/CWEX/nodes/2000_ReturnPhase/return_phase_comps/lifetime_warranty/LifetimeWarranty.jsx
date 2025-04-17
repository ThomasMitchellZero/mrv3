import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { dLocalCtx, dError } from "../../../../../../mrv_data_types";

import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";
import { MessageRibbon } from "../../../../../../components/ui/message_ribbon/MessageRibbon";

function LifetimeWarranty({ oPage }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const pageLS = oPage.oLocalState;
  const setPageLS = oPage.fSetLocalState;
  const resets = oPage.oResets;

  const handleClose = (e) => {
    e.stopPropagation();
    // clear the active overlay
    setPageLS({ ...pageLS, ...resets.overlay });
  };

  // Local State //////////////////////////////////////////////////////

  const LW_LocalState = dLocalCtx({
    oInitLS: {
      sBrand: "",
      sElectric: "",
      iExchQty: 0,
      sReplacementKey: "",
      oReplacement: null,
    },
    oErrorObjects: {},
  });

  const thisLS = LW_LocalState.oLocalState;
  const setThisLS = LW_LocalState.fSetLocalState;

  // Booleans to determine UI element visibility
  const okBrand = thisLS.sBrand === "Kobalt" || thisLS.sBrand === "Craftsman";
  const okElectric = okBrand && thisLS.sElectric === "No";
  const okExchQty = okElectric && thisLS.iExchQty > 0;
  const okReplacement = okExchQty && thisLS.oReplacement;

  // Field State Setters
  const handleReplacementField = (e) => {
    const sInput = e.target.value;
    const draftLS = cloneDeep(thisLS);
    draftPageLS.sReplacementKey = sInput;
    setThisLS(draftLS);
  };

  const handleExchQtyField = (e) => {
    const sInput = Number(e.target.value);
    const draftLS = cloneDeep(thisLS);
    draftLS.iExchQty = sInput;
    setThisLS(draftLS);
  };

  // UI Elements /////////////////////////////////////////////////////////

  // Chips
  const handleChipClick = ({ sLsField, sChipKey }) => {
    const draftLS = cloneDeep(thisLS);
    draftLS[sLsField] = sChipKey;
    setThisLS(draftLS);
  };

  const uiChip = ({ sLsField, sChipKey }) => {
    const sIsActive = pageLS[sLsKey] === sChipKey ? "active" : "";
    return (
      <button
        key={sChipKey}
        onClick={() => handleChipClick({ sLsField, sChipKey })}
        className={`chip ${sIsActive}`}
      >
        {sChipKey}
      </button>
    );
  };

  // Invalid Messages

  return (
    <div
      onClick={handleClose}
      className={`hBox lifetime_warranty scrimOverlay justify__end align__end `}
    >
      <SidesheetMRV sNavBtn="close" sTitle="Unlisted Warranty Item">
        <MessageRibbon
          sMessage="I'm a message! I'm a message!  I'm a message! I'm a message! I'm a message! I'm a message! I'm a message! I'm a message! I'm a message!"
          sType={`critical`}
        />
      </SidesheetMRV>
    </div>
  );
}

export { LifetimeWarranty };
