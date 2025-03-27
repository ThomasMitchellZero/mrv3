import { ProductTile } from "./ProductTile";

function ProductCard({ oProduct }) {
  return (
    <div className={`prodCard floorplan card`}>
      <ProductTile oProduct={oProduct} />
    </div>
  );
}

export { ProductCard };
