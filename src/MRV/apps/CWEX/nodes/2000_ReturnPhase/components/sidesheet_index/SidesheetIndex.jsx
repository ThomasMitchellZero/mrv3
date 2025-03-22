import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";

function SidesheetIndex({ pageLS, fSetPageLS }) {
  return (
    <SidesheetMRV sTitle={"Sidesheet Base"}>
      <div className={`hBox width__max gap__0rem flex__min`}>
        <button className={`tab flex__max`}>Receipts</button>
        <button className={`tab flex__max`}>Items</button>
      </div>
    </SidesheetMRV>
  );
}

export { SidesheetIndex };
