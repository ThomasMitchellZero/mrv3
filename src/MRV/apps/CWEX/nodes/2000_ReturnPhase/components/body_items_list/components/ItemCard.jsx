import { ItemTile } from "./ItemTile";

function ItemCard({ oProduct }) {
  return (
    <div className={`itemCard card width__max`}>
      <ItemTile oProduct={oProduct} />
    </div>
  );
}

export { ItemCard };
