import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";

import { ItemInputs } from "./components/ItemInputs";
import { ReceiptInputs } from "./components/ReceiptInputs";

function SidesheetIndex({ pageLS, fSetPageLS }) {
  // UI Mode Tabs //////////////////////////////////////////////////////

  const handleTabClick = (sTabKey) => {
    fSetPageLS((draft) => ({ ...draft, sMode: sTabKey }));
  };

  const uiModeTab = (sTabKey) => {
    const sIsActive = pageLS.sMode === sTabKey ? "active" : "";
    return (
      <button
        key={sTabKey}
        onClick={() => {
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
    items: <ItemInputs />,
    receipts: <ReceiptInputs />,
  };

  const uiInputCluster = oInputClusters[pageLS.sMode];

  return (
    <SidesheetMRV sTitle={"Add To Return"}>
      <div className={`hBox width__max gap__0rem flex__min`}>
        {uiModeTab("items")}
        {uiModeTab("receipts")}
      </div>
      {uiInputCluster}
    </SidesheetMRV>
  );
}

export { SidesheetIndex };
