import { ProductInfo } from "../../product_info/ProductInfo";

function RejectTile({ oProduct }) {
  return (
    <div className={`hBox gap__1rem height__min flex__max`}>
      <ProductInfo oProduct={oProduct} sSize="s" sLineLimit="2" />
      <div className={`vBox gap__1rem width__max flex__min`}>
        <div className={`heading__medium`}>Item Qty</div>
        <div className={`heading__medium`}>{oProduct.iQty}</div>
      </div>
    </div>
  );
}

export { RejectTile };
