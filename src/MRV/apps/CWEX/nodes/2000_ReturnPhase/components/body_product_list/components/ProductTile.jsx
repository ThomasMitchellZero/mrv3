import { cloneDeep } from "lodash";

import { ProductInfo } from "../../../../../../../components/ui/product_info/ProductInfo";
import { ProductInvoRow } from "./ProductInvoRow";

function ProductTile({ oPage, oProduct }) {
  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;
  const oResets = oPage.oResets;

  const handeClick = (e) => {
    //e.stopPropagation();
    const draftPage = {
      ...cloneDeep(pageLS),
    };
    draftPage.sActiveDataKey = oProduct.sKey;
    fSetPageLS(draftPage);
  };

  const sIsActive = pageLS?.sActiveDataKey === oProduct?.sKey ? "selected" : "";

  return (
    <div
      onClick={(e) => {
        handeClick(e);
      }}
      className={`prodTileCol ${sIsActive} tile `}
    >
      <div className={`productCol`}>
        <ProductInfo oProduct={oProduct} />
        <div className={`qtyInputCol`}></div>
      </div>
      <div className={`invoCol`}>
        <ProductInvoRow />
      </div>
    </div>
  );
}

export { ProductTile };
