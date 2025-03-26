import "./ProductInfo.css";
import { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { dProduct, dProduct_bifrost } from "../../../mrv_data_types";
import { bifrostAPI } from "../../../../local_APIs/bifrost";

/**
 *
 * @param {oProduct} oProduct - The product object to display.
 * @param {"l"|"m"|"s"} sSize - Determines the scale of the elements in the component.
 * @returns
 */
function ProductInfo({ oProduct, sSize = "l" }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const bifrost = useContext(bifrostAPI);

  const bifrostData = bifrost[oProduct.sBifrostKey] || bifrost["0000"];

  const refBifrostProduct = dProduct_bifrost({});
  const refdProduct = dProduct({ sBifrostKey: "0000" });

  const oConfigs = {
    "l": {},
    "m": {},
    "s": {},
  };

  const uiModelNum = bifrostData.sModelNum ? (
    <p className={`body__large color__primary__text`}>
      Model: {bifrostData.sModelNum}
    </p>
  ) : null;

  const uiItemNum = bifrostData.sItemNum ? (
    <p className={`body__large color__primary__text`}>
      Item Number: {bifrostData.sItemNum}
    </p>
  ) : null;

  return (
    <div
      className={`productInfo ${sSize} hBox align__start justify__start gap__1rem`}
    >
      <div className={`vBox prodImg gap__1rem`}>
        <img src={bifrostData.sImgKey} alt={bifrostData.sName} />
      </div>
      <div className={`vBox gap__1rem`}></div>
    </div>
  );
}

export { ProductInfo };
