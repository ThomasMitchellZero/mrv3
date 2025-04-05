import { useState } from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";

function ReturnReason({ oPage, reason }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;

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

  return (
    <div className="returnReason">
      <div className={`tabCtnr`}>
        {uiReasonTab("unwanted")}
        {uiReasonTab("defective")}
      </div>
    </div>
  );
}

export { ReturnReason };
