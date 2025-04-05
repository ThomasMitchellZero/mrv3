import { useState } from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import {
  dPage,
  dProduct,
  dReasonCode,
  dReturnReasons,
  baseStateExTurns,
} from "../../../mrv_data_types";
import { fReturnReasonStatus } from "../../../mrv_controller";

import { PlusMinusField } from "../plus_minus_field/PlusMinusField";

function ReturnReason({ oPage, sActiveProdKey }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const refdProd = dProduct({});
  const oActiveProd = sessionMRV.returnItems[sActiveProdKey];
  const oItemReasonsStatus = fReturnReasonStatus(oActiveProd);

  const aAllReasons = Object.values(oActiveProd.oReturnReasons);

  const aUnwantedReasons = aAllReasons.filter(
    // A reason code is unwanted if bIsDefective is false
    (thisReasonCode) => !thisReasonCode.bIsDefective
  );
  const aDefectiveReasons = aAllReasons.filter(
    // A reason code is defective if bIsDefective is true
    (thisReasonCode) => thisReasonCode.bIsDefective
  );

  const oInitThisLS = {
    sActiveMode: "unwanted",
    sActiveReasonKey: "",
  };

  const [thisLS, fSetThisLS] = useState(oInitThisLS);

  // Tabs  /////////////////////////////////////////////

  const handleTabClick = (sTabKey) => {
    const draftThisLS = cloneDeep(thisLS);

    draftThisLS.sActiveMode = sTabKey;
    draftThisLS.sActiveReasonKey = "";
    fSetThisLS(draftThisLS);
  };

  const uiReasonTab = (sTabKey) => {
    const sIsActive = thisLS.sActiveMode === sTabKey ? "active" : "";
    const sLabel =
      sTabKey === "unwanted"
        ? `Item OK: ${Math.max(oItemReasonsStatus.iUnwanted, 0)}`
        : `Defective: ${oItemReasonsStatus.iDefective}`;

    return (
      <button
        key={sTabKey}
        onClick={(e) => {
          e.stopPropagation();
          handleTabClick(sTabKey);
        }}
        className={`tab ${sIsActive} flex__max`}
      >
        {sLabel}
      </button>
    );
  };

  // Unwanted Items //////////////////////////////////////

  const fHandleUnwantedClick = (oThisUnwantedCode) => {
    const draftMRV = cloneDeep(sessionMRV);
    const rtThisCode =
      draftMRV.returnItems[sActiveProdKey].oReturnReasons[
        oThisUnwantedCode.sKey
      ];
    rtThisCode.bIsMarked = !rtThisCode.bIsMarked;
    // Update the session state
    setSessionMRV(draftMRV);
  };

  const uiUnwantedChip = (oThisUnwantedCode) => {
    const refReasonCode = dReasonCode({});
    const sIsActive = oThisUnwantedCode.bIsMarked ? "active" : "";
    return (
      <button
        key={oThisUnwantedCode.sKey}
        onClick={(e) => {
          e.stopPropagation();
          fHandleUnwantedClick(oThisUnwantedCode);
        }}
        className={`chip ${sIsActive}`}
      >
        {oThisUnwantedCode.sLabel}
      </button>
    );
  };

  const aUnwantedChips = aUnwantedReasons.map((thisReasonCode) => {
    return uiUnwantedChip(thisReasonCode);
  });

  const uiUnwantedCluster = (
    <div className={`vBox gap__1rem width__max flex__min`}>
      <div className={`chipCtnr`}>{aUnwantedChips}</div>
    </div>
  );

  // Defective Items ////////////////////////////////////

  const fHandleDefectiveClick = (oThisDefectiveCode) => {
    const draftLS = cloneDeep(thisLS);
    draftLS.sActiveReasonKey = oThisDefectiveCode.sKey;
    fSetThisLS(draftLS);
  };

  const fHandleDefectiveQtyChange = (iNewQty) => {
    const draftMRV = cloneDeep(sessionMRV);
    const rtThisCode =
      draftMRV.returnItems[sActiveProdKey].oReturnReasons[
        thisLS.sActiveReasonKey
      ];
    rtThisCode.iQty = iNewQty;
    // Update the session state
    setSessionMRV(draftMRV);
  };

  const uiDefectiveChip = (oThisDefectiveCode) => {
    const refReasonCode = dReasonCode({});
    const sIsActive = oThisDefectiveCode.iQty > 0 ? "active" : "";
    const sSelected =
      thisLS.sActiveReasonKey === oThisDefectiveCode.sKey ? "selected" : "";
    return (
      <button
        key={oThisDefectiveCode.sKey}
        onClick={(e) => {
          e.stopPropagation();
          fHandleDefectiveClick(oThisDefectiveCode);
        }}
        className={`chip ${sIsActive} ${sSelected}`}
      >
        {oThisDefectiveCode.sLabel}
      </button>
    );
  };

  const aDefectiveChips = aDefectiveReasons.map((thisReasonCode) => {
    return uiDefectiveChip(thisReasonCode);
  });

  const iActiveReasonQty =
    oActiveProd.oReturnReasons?.[thisLS.sActiveReasonKey]?.iQty || "";
  const uiDefectiveCluster = (
    <div className={`vBox gap__1rem width__max flex__min`}>
      <div className={`chipCtnr`}>{aDefectiveChips}</div>
      <PlusMinusField
        iFieldValue={iActiveReasonQty}
        handleQtyChange={fHandleDefectiveQtyChange}
      />
    </div>
  );

  // UI Body ////////////////////////////////////////////

  const uiActiveModeCluster =
    thisLS.sActiveMode === "unwanted" ? uiUnwantedCluster : uiDefectiveCluster;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`vBox gap__2rem width__max flex__max`}
    >
      <div className={`tabCtnr`}>
        {uiReasonTab("unwanted")}
        {uiReasonTab("defective")}
      </div>
      {uiActiveModeCluster}
    </div>
  );
}

export { ReturnReason };
