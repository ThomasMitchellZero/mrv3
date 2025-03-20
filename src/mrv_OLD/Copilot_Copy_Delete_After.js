import { cloneDeep } from "lodash";
import { useNavigate } from "react-router";

// Shared parameter schema
const sharedParamsSchema = {
  iUnitBaseCost: 0,
  iUnitTax: 0,
  sKey: "",
  iQty: 0,
  sBifrostKey: "",
  sProxyKey: "",
};

// Factory functions
function testMoney(params = {}) {
  const { iUnitBaseCost, iUnitTax, car } = { ...sharedParamsSchema, ...params };
  return {
    iUnitBaseCost,
    iUnitTax,
    car,
  };
}

function testProduct(params = {}) {
  const { sKey, iQty, sBifrostKey, sProxyKey } = { ...sharedParamsSchema, ...params };
  return {
    sKey,
    iQty,
    sBifrostKey,
    sProxyKey,
  };
}

function testProductMoney(params = {}) {
  return {
    ...testProduct(params),
    ...testMoney(params),
  };
}

// Example usage
const money = testProduct({ iUnitBaseCost: 100, iUnitTax: 10, fartrell: "Cluggins" });
const prod = testMoney({ sKey: "123", iQty: 5, sBifrostKey: "abc", sProxyKey: "xyz" });
const atomizedProd = testProductMoney({ iUnitBaseCost: 100, iUnitTax: 10, sKey: "123", iQty: 5, sBifrostKey: "abc", sProxyKey: "xyz" });

console.log(money); // { iUnitBaseCost: 100, iUnitTax: 10 }
console.log(prod);  // { sKey: "123", iQty: 5, sBifrostKey: "abc", sProxyKey: "xyz" }
console.log(atomizedProd); // Combined properties of money and product

export { testMoney, testProduct, testProductMoney };