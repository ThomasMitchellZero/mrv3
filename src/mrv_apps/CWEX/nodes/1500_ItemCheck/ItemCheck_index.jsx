import { dsProduct_full } from "../../../mrv_data_types";
import {
  testMoney,
  testProduct,
  testProductMoney,
} from "../../../Copilot_Copy_Delete_After";

function ItemCheck() {

  const refTestMoney = testMoney({
    iUnitBaseCost: 100,
    iUnitTax: 10,
    car: "Ford",
  });

  const refTestProduct = testProduct({
    sKey: "123",
    iQty: 5,
    sBifrostKey: "abc",
    sProxyKey: "xyz",
  });

  console.log(`${refTestMoney.iUnitBaseCost}`);
  console.log(`${refTestProduct.sKey}`);

  return (
    <main>
      <h1>Item Check</h1>
    </main>
  );
}

export { ItemCheck };
