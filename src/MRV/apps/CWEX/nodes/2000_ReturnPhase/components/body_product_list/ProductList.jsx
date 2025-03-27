import "./ProductList.css";

import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { context, useContext, useState } from "react";

import { ScanScreen } from "../../../../../../components/ui/scan_screen/ScanScreen";
import { ProductCard } from "./components/ProductCard";

function ProductList({ pageLS, fSetPageLS }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const returnItems = sessionMRV.returnItems;

  const aItems = [];
  const uiProducts = Object.values(returnItems).map((thisItem) => {
    return <ProductCard oProduct={thisItem} key={thisItem.sItemKey} />;
  });

  return (
    <main className={`productList gap__1rem`}>
      {uiProducts.length ? (
        <>
          <div className={`columnTitleRow floorplan`}>
            <div className={`prodTileCol`}>
              <div className={`productCol`}>
                <div className={`hBox width__max gap__0rem`}>Return Item</div>
                <div className={`qtyInputCol cell`}>Qty</div>
              </div>
              <div className={`invoCol`}>
                <div className={`hBox width__max gap__0rem`}>
                  <div className={`cell rcptNumCol`}>Receipt For Item</div>
                  <div className={`cell rcptQtyCol`}>Rcpt. Qty</div>
                  <div className={`cell rcptValueCol`}>Unit Value</div>
                </div>
              </div>
            </div>
          </div>
          {uiProducts}
        </>
      ) : (
        <ScanScreen
          mainTitle="Scan or Enter Items Being Returned"
          sIconKey="box"
        />
      )}
    </main>
  );
}

export { ProductList };
