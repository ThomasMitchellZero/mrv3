

import { bifrostAPI } from "../../../../../local_APIs/bifrost";
import { SaleRecordsAPI } from "../../../../../local_APIs/sale_records";
import { useOutlet, useOutletContext } from "react-router-dom";
import { useContext } from "react";

function ItemCheck() {

  const productCtx = useContext(bifrostAPI);
  const saleCtx = useContext(SaleRecordsAPI);  

  return (
    <main className={`mrvPage`}>
      <h1>Item Check</h1>
    </main>
  );
}

export { ItemCheck };
