import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { useContext } from "react";

import { dProduct } from "../../../../../../mrv_data_types";

import { ProductDetailsAside } from "../../../../../../components/ui/product_details_aside/ProductDetailsAside";
import { ReturnReason } from "../../../../../../components/input/return_reason/ReturnReason";

function ReturnProdDetailsAside({ oPage }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const pageLS = oPage.oLocalState;
  const fSetPageLS = oPage.fSetLocalState;

  const refProduct = dProduct({});

  const sProdKey = pageLS.sActiveProdKey;
  const oProdData = sessionMRV.returnItems[sProdKey];

  return (
    <ProductDetailsAside oProduct={oProdData}>
      <ReturnReason oPage={oPage} sActiveProdKey={sProdKey} />
    </ProductDetailsAside>
  );
}

export { ReturnProdDetailsAside };
