import { ProductInfo } from "../../../../../../../components/ui/product_info/ProductInfo";
import { ProductInvoRow } from "./ProductInvoRow";

function ProductTile({ oProduct }) {
  return (
    <div className={`prodTileCol tile`}>
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
