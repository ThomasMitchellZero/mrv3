import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";

function SidesheetIndex({ pageLS, fSetPageLS }) {
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

  return (
    <SidesheetMRV sTitle={"Add To Return"}>
      <div className={`hBox width__max gap__0rem flex__min`}>
        {uiModeTab("items")}
        {uiModeTab("receipts")}
      </div>
    </SidesheetMRV>
  );
}

export { SidesheetIndex };
