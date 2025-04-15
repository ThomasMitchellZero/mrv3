import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router-dom";

import { ProductInfo } from "../../../../../../../components/ui/product_info/ProductInfo";
import { ProductInvoRow } from "./ProductInvoRow";
import { dProduct, dLocalCtx } from "../../../../../../../mrv_data_types";

function ProductTile({ oPage, oProduct }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const oDerived = mrvCtx.oDerived;

  console.log("oDerived", oDerived);

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

  const aItemInvos = Object.values(oDerived.receiptedItems).filter(
    (thisRcptItem) => {
      return thisRcptItem.sBifrostKey === oProduct.sBifrostKey;
    }
  );

  const uiItemInvos = aItemInvos.map((thisRcptItem) => {
    return <ProductInvoRow oProduct={thisRcptItem} />;
  });

  const oNRR = Object.values(oDerived.nrrItems).find((thisRcptItem) => {
    return thisRcptItem.sBifrostKey === oProduct.sBifrostKey;
  });
  if (oNRR) {
    uiItemInvos.push(<ProductInvoRow oPage={oPage} oProduct={oNRR} />);
  }

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
      <div className={`invoCol`}>{uiItemInvos.length ? uiItemInvos : null}</div>
    </div>
  );
}

export { ProductTile };
