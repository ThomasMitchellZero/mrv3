import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router-dom";

import { ProductInfo } from "../../../../../../../components/ui/product_info/ProductInfo";
import { ProductInvoRow } from "./ProductInvoRow";
import { dProduct, dLocalCtx } from "../../../../../../../mrv_data_types";

function ProductTile({ oPage, oProduct }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const fSetPageLS = oPage.fSetLocalState;
  const oResets = oPage.oResets;
  const oPageLS = oPage.oLocalState;

  const refLS = dLocalCtx({});

  const handleClick = (e) => {
    e.stopPropagation();
    const draftPage = {
      ...cloneDeep(oPageLS),
    };
    draftPage.sActiveProdKey = oProduct.sKey; // sActiveDataKey
    fSetPageLS(draftPage);
  };

  const handleQtyInput = (e) => {
    const refProduct = dProduct({});
    const draftSession = cloneDeep(sessionMRV);
    draftSession.returnItems[oProduct.sKey].iQty = Number(e.target.value);
    setSessionMRV(draftSession);
  };

  const sIsActive =
    oPageLS?.sActiveProdKey === oProduct?.sKey ? "selected" : "";

  return (
    <div
      onClick={(e) => {
        handleClick(e);
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
