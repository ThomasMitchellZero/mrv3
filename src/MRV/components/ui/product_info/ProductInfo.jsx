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
      priceQty: `body__medium bold color__primary__text`,
      itemModel: `body__small color__tertiary__text`,
      description: `description body__large l${sLineLimit} color__primary__text`,
      imgSize: "8rem",
    },
    "m": {},
    "s": {},
  };

  // UI:  Price & Qty   ///////////////////////////////////////////////////////

  const uiQty =
    oProduct.iQty && bShowQty ? (
      <p className={`${oConfig[size].priceQty}`}>{oProduct.iQty}</p>
    ) : null;

  const iDisplayPrice = iCustomPrice || bifrostData.iUnitBaseValue;
  const uiPrice =
    bifrostData.iUnitBaseValue && bShowPrice ? (
      <>
        <p className={`${oConfig[size].itemModel}`}>x</p>
        <p className={`${oConfig[size].priceQty}`}>
          ${centsToDollars(iDisplayPrice)}
        </p>
      </>
    ) : null;

  const uiPriceQty =
    uiPrice || uiQty ? (
      <div className={`hBox gap__1rem`}>
        {uiQty}
        {uiPrice}
      </div>
    ) : null;

  // UI:  Item And Model Numbers //////////////////////////////////////////////

  const uiItemNum =
    bifrostData.sItemNum && bShowItemNum ? (
      <p className={`${oConfig[size].itemModel}`}>
        Item#: {bifrostData.sItemNum}
      </p>
    ) : null;

  const uiModelNum =
    bifrostData.sModelNum && bShowModelNum ? (
      <p className={`${oConfig[size].itemModel}`}>
        Model#: {bifrostData.sModelNum}
      </p>
    ) : null;

  const uiItemModel =
    uiItemNum || uiModelNum ? (
      <div className={`hBox gap__1rem`}>
        {uiItemNum}
        {uiModelNum}
      </div>
    ) : null;

  // UI: Description ///////////////////////////////////////////////////////////

  const uiDescription = bifrostData.sDescription ? (
    <p className={`${oConfig[size].description}`}>{bifrostData.sDescription}</p>
  ) : null;

  return (
    <div
      className={`productInfo ${sSize} hBox align__start justify__start gap__1rem`}
    >
      <div className={`vBox prodImg gap__1rem`}>
        <ProductImg
          sImgKey={bifrostData.sImgKey}
          sSize={oConfig[size].imgSize}
        />
      </div>
      <div className={`vBox gap__05rem`}>
        {uiPriceQty}
        {uiItemModel}
        {uiDescription}
      </div>
    </div>
  );
}

export { ProductInfo };
