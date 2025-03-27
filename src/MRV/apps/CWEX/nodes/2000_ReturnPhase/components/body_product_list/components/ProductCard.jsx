import { ProductTile } from "./ProductTile";

function ProductCard({ oProduct }) {
  return (
    <div className={`itemCard card width__max`}>
      <ProductTile oProduct={oProduct} />
    </div>
  );
}

export { ProductCard };
