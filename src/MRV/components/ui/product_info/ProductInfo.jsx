import "./ProductInfo.css";
import { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { dProduct, dProduct_bifrost } from "../../../mrv_data_types";
import { bifrostAPI } from "../../../../local_APIs/bifrost";

/**
 *
 * @param {dProduct} dProduct
 * @param {"l"|"m"|"s"} sSize - Determines the scale of the elements in the component.
 * @returns
 */
function ProductInfo({ dProduct, sSize = "l" }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const bifrost = useContext(bifrostAPI);

  const bifrostData = bifrost[dProduct.sBifrostKey] || bifrost["0000"];

  const refBifrostProduct = dProduct_bifrost({});

  const oConfigs = {
    "l": {},
    "m": {},
    "s": {},
  };

  return (
    <div
      className={`productInfo ${sSize} hBox align__start justify__start gap__1rem`}
    >
      <img
        src={bifrostData.sImgKey}
        alt={bifrostData.sName}
        className={`prodImg`}
      />
      <p className={`body__large color__primary__text`}>{bifrostData.sName}</p>
    </div>
  );
}

export { ProductInfo };
