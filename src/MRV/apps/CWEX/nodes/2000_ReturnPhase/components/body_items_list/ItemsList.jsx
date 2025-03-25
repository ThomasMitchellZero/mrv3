import { IconMRV } from "../../../../../../components/ui/icon/IconMRV";
import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";
import { ScanScreen } from "../../../../../../components/ui/scan_screen/ScanScreen";

function ItemsList({}) {
  const aItems = [];
  const uiItems = [];

  const uiBody = uiItems.length ? (
    uiItems
  ) : (
    <ScanScreen mainTitle="Scan or Enter Items Being Returned" sIconKey="box" />
  );

  return <main className={`body`}>{uiBody}</main>;
}

export { ItemsList };
