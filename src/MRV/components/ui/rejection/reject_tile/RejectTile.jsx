import "./RejectTile.css";
import { ProductInfo } from "../../product_info/ProductInfo";

function RejectTile({ oProduct }) {
  return (
    <div className={`hBox reject-tile gap__1rem height__min flex__max`}>
      <ProductInfo oProduct={oProduct} sSize="m" sLineLimit="2" />
      <div className={`vBox qtyCol`}>
        <div className={`body__medium`}>Item Qty</div>
        <div className={`heading__medium`}>{oProduct.iQty}</div>
      </div>
    </div>
  );
}

export { RejectTile };
