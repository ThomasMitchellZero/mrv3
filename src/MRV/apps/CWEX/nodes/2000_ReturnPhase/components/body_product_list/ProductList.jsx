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
  const uiItems = Object.values(returnItems).map((thisItem) => {
    return <ProductCard oProduct={thisItem} key={thisItem.sItemKey} />;
  });

  const uiBody = uiItems.length ? (
    uiItems
  ) : (
    <ScanScreen mainTitle="Scan or Enter Items Being Returned" sIconKey="box" />
  );

  return <main className={`body ProductList gap__1rem`}>{uiBody}</main>;
}

export { ProductList };
