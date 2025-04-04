import { ProductDetailsAside } from "../../../../../../components/ui/product_details_aside/ProductDetailsAside";

function ReturnProdDetailsAside({ oPage, oProduct }) {
  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;

  return <ProductDetailsAside oProduct={oProduct}></ProductDetailsAside>;
}

export { ReturnProdDetailsAside };
