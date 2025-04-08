import { cloneDeep } from "lodash";
import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";
import "./SidesheetIndex.css";

import { ProductInputs } from "./components/ProductInputs";
import { ReceiptInputs } from "./components/ReceiptInputs";

function SidesheetIndex({ oPage }) {
  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;
  // UI Mode Tabs //////////////////////////////////////////////////////

  const handleTabClick = (sTabKey) => {
    const pageDraft = cloneDeep(pageLS);
    pageDraft.sMode = sTabKey;
    fSetPageLS(pageDraft);
  };

  const uiModeTab = (sTabKey) => {
    const sIsActive = pageLS.sMode === sTabKey ? "active" : "";
    return (
      <button
        key={sTabKey}
        onClick={(e) => {
          e.stopPropagation();
          handleTabClick(sTabKey);
        }}
        className={`tab ${sIsActive} flex__max`}
      >
        {sTabKey}
      </button>
    );
  };

  // Input Clusters  //////////////////////////////////////////////

  const oInputClusters = {
    items: <ProductInputs oPage={oPage} />,
    receipts: <ReceiptInputs oPage={oPage} />,
  };

  const uiInputCluster = oInputClusters[pageLS.sMode];

  return (
    <SidesheetMRV sTitle={"Add To Return"}>
      <div className={`sidesheetIndex vBox gap__2rem width__max flex__min`}>
        <div className={`hBox width__max gap__0rem flex__min`}>
          {uiModeTab("items")}
          {uiModeTab("receipts")}
        </div>
        {uiInputCluster}
      </div>
    </SidesheetMRV>
  );
}

export { SidesheetIndex };
