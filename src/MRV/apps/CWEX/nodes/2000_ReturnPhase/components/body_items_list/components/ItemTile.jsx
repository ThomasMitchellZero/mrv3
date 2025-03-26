import { ProductInfo } from "../../../../../../../components/ui/product_info/ProductInfo";

function ItemTile({ dProduct }) {
  console.log(dProduct);
  return (
    <div className={`itemTile tile width__max`}>
      <ProductInfo dProduct={dProduct} />
    </div>
  );
}

export { ItemTile };
