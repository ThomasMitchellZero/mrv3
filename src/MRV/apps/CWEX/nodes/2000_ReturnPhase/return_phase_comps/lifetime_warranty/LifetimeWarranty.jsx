import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { dLocalCtx, dError, dProduct } from "../../../../../../mrv_data_types";
import { useContext } from "react";
import { bifrostAPI } from "../../../../../../../local_APIs/bifrost";
import { addItem } from "../../../../../../mrv_controller";

import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";
import { MessageRibbon } from "../../../../../../components/ui/message_ribbon/MessageRibbon";
import { PlusMinusField } from "../../../../../../components/input/plus_minus_field/PlusMinusField";
import { IconMRV } from "../../../../../../components/ui/icon/IconMRV";
import { ProductInfo } from "../../../../../../components/ui/product_info/ProductInfo";

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
    sProdInput: "",
    oReplacement: null,
    sReplacerProd: "",
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

  ////////////////////////////////////////////////////////////////////////
  // UI Elements
  ////////////////////////////////////////////////////////////////////////

  // Chips --------------------------------------------------

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

  // visibility Booleans ---------------------------------

  const show_Brand = true;
  const fill_Brand = thisLS.sBrand;
  const valid_Brand = fill_Brand && fill_Brand !== "Other";

  const show_Electric = valid_Brand;
  const fill_Electric = thisLS.sElectric;
  const valid_Electric = fill_Electric && fill_Electric !== "Yes";

  const show_ExchQty = valid_Electric;
  const fill_ExchQty = thisLS.iExchQty;
  const valid_ExchQty = fill_ExchQty && fill_ExchQty > 0;

  const show_ReplacementPod = valid_ExchQty;

  // UI Brand ------------------------------------------------

  const uiBrand = (
    <div className={`vBox flex__min width__max gap__05rem`}>
      <p className={`body__medium`}>Brand of item being returned:</p>
      <div className={`chipCtnr`}>
        {uiChip({ sLsField: "sBrand", sChipKey: "Kobalt" })}
        {uiChip({ sLsField: "sBrand", sChipKey: "Craftsman" })}
        {uiChip({ sLsField: "sBrand", sChipKey: "Other" })}
      </div>
    </div>
  );

  const uiBrandError = (
    <MessageRibbon
      sMessage={`Brand not eligible for Lifetime Warranty replacement.  Contact manufacturer.`}
      sType="critical"
    />
  );

  // UI Electric --------------------------------
  const uiElectric = (
    <div className={`vBox flex__min width__max gap__05rem`}>
      <p className={`body__medium`}>Does item use electricity?</p>
      <div className={`chipCtnr`}>
        {uiChip({ sLsField: "sElectric", sChipKey: "No" })}
        {uiChip({ sLsField: "sElectric", sChipKey: "Yes" })}
      </div>
    </div>
  );

  const uiElectricError = (
    <MessageRibbon
      sMessage={`Electric items ineligible for Lifetime Warranty replacement.  Contact the manufacturer.`}
      sType="critical"
    />
  );

  // UI ExchQty ------------------------------
  const uiExchQty = (
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
  );

  // Replacement Cluster ------------------------------

  const fHandleAdd = (e) => {
    e.stopPropagation();

    const draftLS = cloneDeep(thisLS);
    if (draftLS.sProdInput in bifrost) {
      draftLS.sReplacerProd = draftLS.sProdInput;
    } else {
      draftLS.sActiveError = "invalidItem";
    }
    setThisLS(draftLS);
  };

  const uiItemError =
    thisLS.sActiveError === "invalidItem" ? (
      <p className={`warning width__max flex__min text__align__right`}>
        Invalid Item #
      </p>
    ) : null;

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
            draftLS.sProdInput = e.target.value;
            setThisLS({ ...draftLS, ...resets.errorOnly });
          }}
          value={thisLS.sProdInput}
          placeholder={`Item Number`}
        />
        <button onClick={fHandleAdd} className={`secondary`}>
          Add
        </button>
      </div>
      {uiItemError}
    </div>
  );

  // Replacement Details

  const handleClearItem = (e) => {
    e.stopPropagation();
    const draftLS = { ...cloneDeep(thisLS), ...resets.errorOnly };
    draftLS.sReplacerProd = "";
    setThisLS(draftLS);
  };

  const handleConfirmAdd = (e) => {
    e.stopPropagation();
    const draftSession = cloneDeep(sessionMRV);
    const outReturnItems = addItem({
      oTargetRepo: draftSession.returnItems,
      oItemToAdd: dProduct({
        iQty: thisLS.iExchQty,
        sProxyKey: thisLS.sReplacerProd,
        sBifrostKey: "LWNB",
        sKey: `_LWNB_${thisLS.sReplacerProd}`,
      }),
    });
    draftSession.returnItems = outReturnItems;
    setSessionMRV(draftSession);
    handleClose(e);
  };

  const uiReplacementDetails = (
    <div className={`vBox flex__min width__max gap__1rem`}>
      <ProductInfo
        oProduct={dProduct({
          sKey: `_${thisLS.sReplacerProd}`,
          sBifrostKey: `${thisLS.sReplacerProd}`,
        })}
        sSize="m"
        bShowQty={false}
      />
      <div className={`hBox width__max flex__min gap__1rem`}>
        <button onClick={handleClearItem} className={`secondary`} type="button">
          Clear Item
        </button>
        <button
          onClick={(e) => handleConfirmAdd(e)}
          className={`primary flex__max`}
          type="button"
        >
          Confirm & Add
        </button>
      </div>
    </div>
  );

  const uiReplacmentCluster = thisLS.sReplacerProd
    ? uiReplacementDetails
    : uiReplacementInput;

  // Final Output ///////////////////////////////////////////////////////

  return (
    <div
      onClick={(e) => {
        handleClose(e);
      }}
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
          {uiExchQty}
          {uiReplacmentCluster}
        </div>
      </SidesheetMRV>
    </div>
  );
}

export { LifetimeWarranty };
