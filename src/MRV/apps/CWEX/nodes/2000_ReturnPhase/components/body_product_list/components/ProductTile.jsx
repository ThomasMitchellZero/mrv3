import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router-dom";

import { ProductInfo } from "../../../../../../../components/ui/product_info/ProductInfo";
import { ProductInvoRow } from "./ProductInvoRow";
import { dProduct } from "../../../../../../../mrv_data_types";

function ProductTile({ oPage, oProduct }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

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

  const handleQtyInput = (e) => {
    const refProduct = dProduct({});
    const draftSession = cloneDeep(sessionMRV);
    draftSession.returnItems[oProduct.sKey].iQty = Number(e.target.value);
    setSessionMRV(draftSession);
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
        <div className={`qtyInputCol`}>
          <input
            type="number"
            className={`width__max`}
            value={oProduct.iQty}
            onChange={(e) => {
              handleQtyInput(e);
            }}
          />
        </div>
      </div>
      <div className={`invoCol`}>
        <ProductInvoRow />
      </div>
    </div>
  );
}

export { ProductTile };
