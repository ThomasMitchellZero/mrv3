import { ProductInfo } from "../../../../components/ui/product_info/ProductInfo";

function RejectTile({ oProduct }) {
  return (
    <div className={`hBox gap__1rem height__min flex__max`}>
      <ProductInfo oProduct={oProduct} sSize="small" sLineLimit="2" />
      <div className={`vBox gap__1rem width__max flex__min`}>
        <div className={`heading__medium`}>{oProduct.sKey}</div>
        <div className={`heading__medium`}>{oProduct.iQty}</div>
      </div>
    </div>
  );
}

export { RejectTile };
