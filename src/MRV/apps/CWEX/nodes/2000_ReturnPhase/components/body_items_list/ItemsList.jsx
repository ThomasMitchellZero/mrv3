import { IconMRV } from "../../../../../../components/ui/icon/IconMRV";
import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";
import { ScanScreen } from "../../../../../../components/ui/scan_screen/ScanScreen";
import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { context, useContext, useState } from "react";
import { ItemCard } from "./components/ItemCard";
import { ProductInfo } from "../../../../../../components/ui/product_info/ProductInfo";

function ItemsList({ pageLS, fSetPageLS }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const returnItems = sessionMRV.returnItems;

  const aItems = [];
  const uiItems = Object.values(returnItems).map((thisItem) => {
    return <ItemCard dProduct={thisItem} key={thisItem.sItemKey} />;
    //return <ProductInfo dProduct={thisItem} />;
  });

  const uiBody = uiItems.length ? (
    uiItems
  ) : (
    <ScanScreen mainTitle="Scan or Enter Items Being Returned" sIconKey="box" />
  );

  return <main className={`body`}>{uiBody}</main>;
}

export { ItemsList };
