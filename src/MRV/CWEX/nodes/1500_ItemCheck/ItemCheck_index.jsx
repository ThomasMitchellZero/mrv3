
import { dsMoney } from "../../../mrv_data_types";

function ItemCheck() {

  const product = dsProduct_session({
    sKey: "100",
    iQty: 1,
    sItemNum: "100",
    sBifrostKey: "100",
  });

  return (
    <main>
      <h1>Item Check</h1>
    </main>
  );
}

export { ItemCheck };
