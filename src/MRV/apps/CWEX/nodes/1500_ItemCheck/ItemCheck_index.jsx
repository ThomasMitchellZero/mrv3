import { bifrostAPI } from "../../../../../local_APIs/bifrost";
import { SaleRecordsAPI } from "../../../../../local_APIs/sale_records";
import { useOutlet, useOutletContext } from "react-router-dom";
import { useContext } from "react";

import { HeaderMRV } from "../../../../components/layout/header/HeaderMRV";
import { HeaderCWEX } from "../../resources/CWEX_configs";

function ItemCheck() {
  const productCtx = useContext(bifrostAPI);
  const saleCtx = useContext(SaleRecordsAPI);

  return (
    <main className={`mrvPage`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Item Check"} />
      </div>
    </main>
  );
}

export { ItemCheck };
