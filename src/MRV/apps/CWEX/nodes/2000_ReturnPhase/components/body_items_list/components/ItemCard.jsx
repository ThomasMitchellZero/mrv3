import { ItemTile } from "./ItemTile";

function ItemCard({ dProduct }) {
  return (
    <div className={`itemCard card width__max`}>
      <ItemTile dProduct={dProduct} />
    </div>
  );
}

export { ItemCard };
