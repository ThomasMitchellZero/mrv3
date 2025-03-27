import { ProductInfo } from "../../../../../../../components/ui/product_info/ProductInfo";

function ProductTile({ oProduct }) {
  return (
    <div className={`itemTile tile width__max`}>
      <ProductInfo oProduct={oProduct} />
    </div>
  );
}

export { ProductTile };
