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

function ReturnReason({ oPage, sActiveProdKey }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;

  const refdProd = dProduct({});
  const oActiveProd = sessionMRV.returnItems[sActiveProdKey];

  const refSession1 = baseStateExTurns({});
  const refReasonCode1 = dReasonCode({});
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
  };

  const [thisLS, fSetThisLS] = useState(oInitThisLS);

  // Tabs  /////////////////////////////////////////////

  const handleTabClick = (sTabKey) => {
    const draftThisLS = cloneDeep(thisLS);
    draftThisLS.sActiveMode = sTabKey;
    fSetThisLS(draftThisLS);
  };

  const uiReasonTab = (sTabKey) => {
    const sIsActive = thisLS.sActiveMode === sTabKey ? "active" : "";
    const sTabTitle = sTabKey === "unwanted" ? "Item OK" : "Defective";
    const sTabLabel = `${sTabTitle}`;

    return (
      <button
        key={sTabKey}
        onClick={(e) => {
          e.stopPropagation();
          handleTabClick(sTabKey);
        }}
        className={`tab ${sIsActive} flex__max`}
      >
        {sTabLabel}
      </button>
    );
  };

  // Unwanted Items //////////////////////////////////////

  const uiUnwantedChip = (oThisUnwantedCode) => {
    const refReasonCode = dReasonCode({});
    return (
      <button
        key={oThisUnwantedCode.sKey}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`chip`}
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

  const uiDefectiveChip = (oThisDefectiveCode) => {
    const refReasonCode = dReasonCode({});
    return (
      <button
        key={oThisDefectiveCode.sKey}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`chip`}
      >
        {oThisDefectiveCode.sLabel}
      </button>
    );
  };

  const aDefectiveChips = aDefectiveReasons.map((thisReasonCode) => {
    return uiDefectiveChip(thisReasonCode);
  });

  const uiDefectiveCluster = (
    <div className={`vBox gap__1rem width__max flex__min`}>
      <div className={`chipCtnr`}>{aDefectiveChips}</div>
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
