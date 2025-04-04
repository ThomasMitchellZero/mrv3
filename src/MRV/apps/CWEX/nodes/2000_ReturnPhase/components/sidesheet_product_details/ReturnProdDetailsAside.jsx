import { ProductDetailsAside } from "../../../../../../components/ui/product_details_aside/ProductDetailsAside";
import { dPage, dProduct } from "../../../../../../mrv_data_types";
import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { useContext } from "react";

function ReturnProdDetailsAside({ oPage }) {
  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const refPage = dPage({});
  const refProduct = dProduct({});

  console.log(oPage);
  console.log("pageLS", pageLS);

  const sProdKey = pageLS.sActiveProdKey;
  console.log("oProdKey", sProdKey);
  const oProdData = sessionMRV.returnItems[sProdKey];
  console.log("oProdData", oProdData);

  return <ProductDetailsAside oProduct={oProdData}></ProductDetailsAside>;
}

export { ReturnProdDetailsAside };
