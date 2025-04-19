import "./ProductInfo.css";
import { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { dProduct, dProduct_bifrost } from "../../../mrv_data_types";
import { bifrostAPI } from "../../../../local_APIs/bifrost";
import { centsToDollars } from "../../../mrv_controller";
import { ProductImg } from "../product_img/ProductImg";

/**
 *
 * @param {oProduct} oProduct - The product object to display.
 * @param {"l"|"m"|"s"} sSize - Determines the scale of the elements in the component.
 * @returns
 */
function ProductInfo({
  oProduct,
  sSize = "l",
  bShowModelNum = true,
  bShowItemNum = true,
  bShowPrice = true,
  iCustomPrice = null,
  bShowQty = true,
  sLineLimit = "2",
}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const bifrost = useContext(bifrostAPI);

  const bifrostData = bifrost[oProduct.sBifrostKey] || bifrost["0000"];

  const refBifrostProduct = dProduct_bifrost({});
  const refdProduct = dProduct({ sBifrostKey: "0000" });

  // If size is not an accepted value, default to "l"
  const size = sSize === "s" ? "s" : sSize === "m" ? "m" : "l";

  const oConfig = {
    "l": {
      priceQty: `body__medium`,
      itemModel: `body__small`,
      description: `body__large`,
      imgHeight: "8rem",
      imgWidth: "8rem",
      gap: "gap__05rem",
    },
    "m": {
      priceQty: `body__medium`,
      itemModel: `body__tiny`,
      description: `body__medium`,
      imgHeight: "5.5rem",
      imgWidth: "5.5rem",
      gap: "gap__0rem",
    },
    "s": {},
  };

  const config = oConfig[size];

  // UI:  Price & Qty   ///////////////////////////////////////////////////////

  const uiPrice =
    bifrostData.iUnitBaseValue && bShowPrice ? (
      <p>${centsToDollars(iCustomPrice || bifrostData.iUnitBaseValue)}</p>
    ) : null;

  const uiQty = oProduct.iQty && bShowQty ? <p>{oProduct.iQty}</p> : null;

  const uiX = uiQty && uiPrice && <p>x</p>;

  const uiPriceQty =
    uiPrice || uiQty ? (
      <div
        className={`hBox ${config.priceQty} color__tertiary__text gap__1rem bold`}
      >
        {uiQty}
        {uiX}
        {uiPrice}
      </div>
    ) : null;

  // UI:  Item And Model Numbers //////////////////////////////////////////////

  const uiItemNum =
    bifrostData.sItemNum && bShowItemNum ? (
      <p>Item#: {bifrostData.sItemNum}</p>
    ) : null;

  const uiModelNum =
    bifrostData.sModelNum && bShowModelNum ? (
      <p>Model#: {bifrostData.sModelNum}</p>
    ) : null;

  const uiItemModel =
    uiItemNum || uiModelNum ? (
      <div
        className={`hBox gap__1rem color__tertiary__text ${config.itemModel}`}
      >
        {uiItemNum}
        {uiModelNum}
      </div>
    ) : null;

  // UI: Description ///////////////////////////////////////////////////////////

  const uiDescription = bifrostData.sDescription ? (
    <p
      className={`description line${sLineLimit} color__primary__text ${config.description}`}
    >
      {bifrostData.sDescription}
    </p>
  ) : null;

  return (
    <div
      className={`productInfo ${sSize} hBox align__start justify__start gap__1rem`}
    >
      <ProductImg
        sImgKey={bifrostData.sImgKey}
        sWidth={config.imgWidth}
        sHeight={config.imgHeight}
      />

      <div className={`vBox ${config.gap} flex__max height__min`}>
        {uiPriceQty}
        {uiItemModel}
        {uiDescription}
      </div>
    </div>
  );
}

export { ProductInfo };
