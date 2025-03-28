import { cloneDeep } from "lodash";

import { ProductInfo } from "../../../../../../../components/ui/product_info/ProductInfo";
import { ProductInvoRow } from "./ProductInvoRow";
import { ReturnPhase_locState } from "../../../ReturnPhase_schemas";

function ProductTile({ oProduct, pageLS, fSetPageLS }) {
  const refPageLS = ReturnPhase_locState;

  const handeClick = () => {
    const draftPage = cloneDeep(pageLS);
    draftPage.sActiveDataKey = oProduct.sKey;
    // it's working up to here, but the state isn't being set.
    console.log(draftPage);
    fSetPageLS(draftPage);
  };

  const sIsActive = pageLS?.sActiveDataKey === oProduct?.sKey ? "selected" : "";

  return (
    <div onClick={handeClick} className={`prodTileCol ${sIsActive} tile `}>
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
