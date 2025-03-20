

import { bifrostAPI } from "../../../../../local_APIs/bifrost";
import { SaleRecordsAPI } from "../../../../../local_APIs/sale_records";
import { useOutlet, useOutletContext } from "react-router-dom";
import { useContext } from "react";

import { HeaderMRV } from "../../../../components/layout/header/HeaderMRV";

function ItemCheck() {

  const productCtx = useContext(bifrostAPI);
  const saleCtx = useContext(SaleRecordsAPI);

  return (
    <main className={`mrvPage`}>
      <HeaderMRV title={"Item Check"}/>
    </main>
  );
}

export { ItemCheck };
