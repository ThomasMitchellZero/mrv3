import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { dLocalCtx, dError } from "../../../../../../mrv_data_types";
import { useContext } from "react";
import { bifrostAPI } from "../../../../../../../local_APIs/bifrost";

import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";
import { MessageRibbon } from "../../../../../../components/ui/message_ribbon/MessageRibbon";
import { PlusMinusField } from "../../../../../../components/input/plus_minus_field/PlusMinusField";
import { IconMRV } from "../../../../../../components/ui/icon/IconMRV";
import { use } from "react";

function LifetimeWarranty({ oPage }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const bifrost = useContext(bifrostAPI);

  const pageLS = oPage.oLocalState;
  const setPageLS = oPage.fSetLocalState;
  const pageResets = oPage.oResets;

  const handleClose = (e) => {
    e.stopPropagation();
    // clear the active overlay
    setPageLS({ ...pageLS, ...pageResets.overlay });
  };

  // Local State //////////////////////////////////////////////////////

  const initLS = {
    sBrand: "",
    sElectric: "",
    iExchQty: 0,
    sReplacementKey: "",
    oReplacement: null,
    sActiveError: "",
  };

  const LW_localCtx = dLocalCtx({
    oInitLS: initLS,
    oErrorObjects: {
      invalidItem: dError({
        sKey: "invalidItem",
        sMessage: "Invalid Item #",
      }),
    },
    oResets: {
      errorOnly: {
        sActiveError: initLS.sActiveError,
      },
    },
  });

  const thisLS = LW_localCtx.oLocalState;
  const setThisLS = LW_localCtx.fSetLocalState;
  const resets = LW_localCtx.oResets;
  const sError = thisLS.sActiveError;

  // visibility Booleans /////////////////////////////////////////////
  const visBrandError = thisLS.sBrand === "Other";
  const visElectric = !visBrandError && thisLS.sBrand;
  const visElectricError = visElectric && thisLS.sElectric === "Yes";
  const visExchQty = !visElectricError && thisLS.sElectric;
  const visNewItemInput = visExchQty && thisLS.iExchQty > 0;
  const visItemError = sError === "invalidItem";
  const visReplacement = false; //

  // UI Elements /////////////////////////////////////////////////////////

  // Chips

  const uiChip = ({ sLsField, sChipKey }) => {
    const sIsActive = thisLS[sLsField] === sChipKey ? "selected" : "";
    return (
      <button
        key={sChipKey}
        onClick={(e) => {
          e.stopPropagation();
          const draftLS = cloneDeep(thisLS);
          // Ternary allows user to toggle chip selected.
          draftLS[sLsField] = draftLS[sLsField] === sChipKey ? "" : sChipKey;
          setThisLS(draftLS);
        }}
        type="button"
        className={`chip ${sIsActive}`}
      >
        {sChipKey}
      </button>
    );
  };

  // Replacement Input

  const fHandleAdd = (e) => {
    e.stopPropagation();
    const draftLS = cloneDeep(thisLS);
    if (draftLS.sReplacementKey in bifrost) {
      draftLS.oReplacement = draftLS.sReplacementKey;
    } else {
      draftLS.sActiveError = "invalidItem";
    }
    setThisLS(draftLS);
  };

  const uiItemError = (
    <p className={`warning width__max text__align__right`}>
      {LW_localCtx.oErrorObjects?.invalidItem?.sMessage}
    </p>
  );

  const uiReplacementInput = (
    <div className={`vBox flex__min width__max gap__1rem`}>
      <div className="divider h" />
      <p className={`body__medium`}>Add similar replacement item:</p>
      <div className={`hBox align__center width__max flex__min gap__1rem`}>
        <IconMRV
          sIconKey="barcode"
          ctnrSize="2rem"
          fontSize="2rem"
          sIconColor="color__interactive__text"
        />
        <input
          className={`width__max`}
          type="text"
          onChange={(e) => {
            e.stopPropagation();
            const draftLS = cloneDeep(thisLS);
            draftLS.sReplacementKey = e.target.value;
            setThisLS({ ...draftLS, ...resets.errorOnly });
          }}
        />
        <button onClick={fHandleAdd} className={`secondary`}>
          Add
        </button>
      </div>
      {visItemError && uiItemError}
    </div>
  );

  return (
    <div
      onClick={handleClose}
      className={`hBox gap__2rem lifetime_warranty scrimOverlay justify__end align__end `}
    >
      <SidesheetMRV
        fNavBtnClick={handleClose}
        sNavBtn="close"
        sTitle="Unlisted Warranty Item"
        fBgClick={(e) => {
          e.stopPropagation();
          setThisLS({ ...thisLS, ...resets.errorOnly });
        }}
      >
        <div className={`vBox flex__min width__max gap__2rem`}>
          <div className={`vBox flex__min width__max gap__05rem`}>
            <p className={`body__medium`}>Brand of item being returned:</p>
            <div className={`chipCtnr`}>
              {uiChip({ sLsField: "sBrand", sChipKey: "Kobalt" })}
              {uiChip({ sLsField: "sBrand", sChipKey: "Craftsman" })}
              {uiChip({ sLsField: "sBrand", sChipKey: "Other" })}
            </div>
          </div>
          {visBrandError && (
            <MessageRibbon
              sMessage={`Brand ineligible for Lifetime Warranty replacement.  Contact the manufacturer.`}
              sType="critical"
            />
          )}
          {visElectric && (
            <div className={`vBox flex__min width__max gap__05rem`}>
              <p className={`body__medium`}>Does item use electricity?</p>
              <div className={`chipCtnr`}>
                {uiChip({ sLsField: "sElectric", sChipKey: "No" })}
                {uiChip({ sLsField: "sElectric", sChipKey: "Yes" })}
              </div>
            </div>
          )}
        </div>
        {visElectricError && (
          <MessageRibbon
            sMessage={`Electric items ineligible for Lifetime Warranty replacement.  Contact the manufacturer.`}
            sType="critical"
          />
        )}
        {visExchQty && (
          <div className={`vBox flex__min width__max gap__05rem`}>
            <p className={`body__medium`}>Qty to exchange:</p>
            <PlusMinusField
              iFieldValue={thisLS.iExchQty}
              handleQtyChange={(qty) => {
                const draftLS = cloneDeep(thisLS);
                draftLS.iExchQty = qty;
                setThisLS(draftLS);
              }}
              bIsMinusDisabled={thisLS.iExchQty < 1}
            />
          </div>
        )}
        {visNewItemInput && uiReplacementInput}
      </SidesheetMRV>
    </div>
  );
}

export { LifetimeWarranty };
