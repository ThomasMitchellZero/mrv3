import { bifrostAPI } from "../../../../../local_APIs/bifrost";
import { SaleRecordsAPI } from "../../../../../local_APIs/sale_records";
import { useOutlet, useOutletContext } from "react-router-dom";
import { useContext } from "react";

import { HeaderCWEX } from "../../resources/CWEX_configs";
import { SidesheetMRV } from "../../../../components/layout/sidesheet/SidesheetMRV";

function ItemCheck() {
  const productCtx = useContext(bifrostAPI);
  const saleCtx = useContext(SaleRecordsAPI);

  return (
    <main className={`mrvPage`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Item Check"} />
        <div className={`body`}></div>
      </div>
      <SidesheetMRV sTitle={"Lifetime Warranty Items"}>
        <button>Log Product Context</button>
      </SidesheetMRV>
    </main>
  );
}

export { ItemCheck };
