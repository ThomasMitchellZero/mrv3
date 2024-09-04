//---- Product ----

import { cloneDeep } from "lodash";
import { act } from "react";

class moneyObj {
  constructor({
    unitBaseValue = 0,
    salesTax = 0,
    salesTaxRate = 0.09,
    makeNegative = true,
  }) {
    this.unitBaseValue = unitBaseValue;
    this.salesTaxRate = salesTaxRate;
    this.salesTax = salesTax || this.calcSalesTax();

    if (makeNegative) {
      this.unitBaseValue = -this.unitBaseValue;
      this.salesTax = -this.salesTax;
    }
  }

  // If I want to auto-calculate sales tax, I can set this.salesTax to 0.
  calcSalesTax() {
    const outSalesTax = Math.round(this.subTotal * this.salesTaxRate);
    return outSalesTax;
  }

  // derived values are never modified directly so they are provided as getters.
  get subTotal() {
    return this.unitBaseValue;
  }
  get unitTotal() {
    return this.subTotal + this.salesTax || 0;
  }
}

export { moneyObj };

class SingleDispo {
  // keys don't match values, refactor this.
  constructor({
    keyStr,
    isResellable = true,
    isDamaged = false,
    isChosen = false,
    dispoQty = 0,
    strLabel = "NO LABEL",
  }) {
    this.keyStr = keyStr;
    this.strLabel = strLabel;
    this.isDamaged = isDamaged;
    this.dispoQty = dispoQty;
    this.isChosen = isChosen;
  }
}

class ItemDisposObj {
  constructor({
    dispoItemNum,
    itemQty,
    dispoItemAtom = new returnAtom({}),
    allDisposObj = {},
  }) {
    this.dispoItemNum = dispoItemNum;
    this.itemQty = itemQty;
    this.dispoItemAtom = dispoItemAtom;
    this.allDisposObj = allDisposObj;
  }
  get qtySansDispo() {
    const refSingleDispo = new SingleDispo({});
    const aAllDispos = Object.values(cloneDeep(this.allDisposObj));

    let outQtySansDispo = this.itemQty;
    aAllDispos.forEach((iDispo) => {
      const minusQty = iDispo?.dispoQty || 0;
      outQtySansDispo -= minusQty;
    });
    return outQtySansDispo;
  }
}

export { SingleDispo, ItemDisposObj };

// This is the latest for Return Reasons.  I eventually want to sunset all the Dispos stuff.

const oReturnReason = ({
  keyStr = "",
  strLabel = "NO LABEL",
  isDefective = false,
  reasonQty = 0,
  isChosen = false,
}) => {
  const uiLabel =
    isDefective && reasonQty ? `${strLabel}: ${reasonQty}` : `${strLabel}`;
  return { keyStr, strLabel, isDefective, reasonQty, isChosen, uiLabel };
};

const defaultReturnReasons = {
  noWorky: oReturnReason({
    isDefective: true,
    keyStr: "noWorky",
    strLabel: "Doesn't Work",
  }),
  missingParts: oReturnReason({
    isDefective: true,
    keyStr: "missingParts",
    strLabel: "Missing Parts",
  }),
  rusted: oReturnReason({
    isDefective: true,
    keyStr: "rusted",
    strLabel: "Rusted Metal",
  }),
  cosmetic: oReturnReason({
    isDefective: true,
    keyStr: "cosmetic",
    strLabel: "Cosmetic",
  }),

  // Didn't Want / Need Reasons

  boughtWrong: oReturnReason({
    isDefective: false,
    keyStr: "boughtWrong",
    strLabel: "Bought Wrong Item",
  }),
  foundCheaper: oReturnReason({
    isDefective: false,
    keyStr: "foundCheaper",
    strLabel: "Found Better Price",
  }),
  notNeeded: oReturnReason({
    isDefective: false,
    keyStr: "notNeeded",
    strLabel: "Item Not Needed",
  }),
  tooMany: oReturnReason({
    isDefective: false,
    keyStr: "tooMany",
    strLabel: "Bought Too Many",
  }),
  other: oReturnReason({
    isDefective: false,
    keyStr: "other",
    strLabel: "Other Reason",
  }),
};

const itemReturnReasons = ({
  itemAtom = new returnAtom({}),
  oAllItemReasons = { ...defaultReturnReasons },
}) => {
  const refOSingleReason = oReturnReason({});
  const itemQty = itemAtom.atomItemQty;
  const itemNum = itemAtom.atomItemNum;
  const reasonQty = Object.values(oAllItemReasons).reduce((acc, curr) => {
    return acc + curr.reasonQty;
  }, 0);
  const qtySansReason = itemQty - reasonQty;

  return {
    itemAtom,
    oAllItemReasons,
    itemQty,
    itemNum,
    reasonQty,
    qtySansReason,
    get freshItemQty() {
      return this.itemAtom.atomItemQty; // not sure this stays fresh?
    },
  };
};

export { oReturnReason, itemReturnReasons };

function parentChildGroup({
  parentAtom = new returnAtom({}),
  allChildren = [],
  accessories = [],
  services = [],
  lpp = [],
}) {
  return { parentAtom, allChildren, accessories, services, lpp };
}

export { parentChildGroup };

class Product {
  constructor({
    img = "",
    price = 0,
    itemNum = "1",
    modelNum = "1",
    description = "",
    categories = {}, // I changed this
    specialCategories = {},
    reqAccessories = null,
    restockFee = null,
    inStock = 99,
    dcLocations = {},
  }) {
    this.img = img;
    this.price = price;
    this.tax = Math.round(price / 11);
    this.itemNum = itemNum;
    this.modelNum = modelNum;
    this.description = description;
    this.categories = categories;
    this.specialCategories = specialCategories;
    this.reqAccessories = reqAccessories;
    this.restockFee = restockFee;
    this.inStock = inStock;
    this.dcLocations = dcLocations;
  }
}

const ProdClass = ({
  mainItem = false,
  accessory = false,
  lpp_3yr = false,
  lpp_5yr = false,
  service = false,
}) => {
  const classStr = mainItem
    ? "mainItem"
    : accessory
    ? "accessory"
    : lpp_3yr
    ? "lpp_3yr"
    : lpp_5yr
    ? "lpp_5yr"
    : service
    ? "service"
    : null;

  return classStr;
};

export { Product, ProdClass };

//---- Sales Record ----

const salesRecord = ({ k, str }) => {
  return { k, str };
};

const saleRecordTypes = {
  order: salesRecord({ k: "order", str: "Order" }),
  invoice: salesRecord({ k: "invoice", str: "Invoice" }),
};

export { saleRecordTypes };

//---- Orders ----

class InvoProduct {
  // these should be atoms and I want to get rid of this but I think Returns is still using it.
  constructor({
    quantity = 1,
    price = 100,
    tax = 10,
    childItemsObj = {},
    prodClass = "",
    moneyObj = {},
  }) {
    this.quantity = quantity;
    this.price = price;
    this.tax = tax;
    this.childItemsObj = childItemsObj;
    this.prodClass = prodClass;
    this.moneyObj = moneyObj;
  }
}

/*

*/

class Invoice_SR {
  constructor({
    invoNum = "FART",
    store = "1234",
    date = new Date(2022, 1, 22),
    payment = {},
    products = {},
    itemAtomsArr = [],
    symbolsArr = [],
  }) {
    this.invoNum = invoNum;
    this.invoiceDetails = {
      store: store,
      date: date,
      payment: payment,
    };
    this.store = store;
    this.date = date;
    this.payment = payment;
    this.dateStr = date.toLocaleDateString("us-EN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    this.products = products;
    this.symbolsArr = symbolsArr;

    if (itemAtomsArr.length) {
      this.itemAtomsArr = itemAtomsArr.map((thisAtom) => {
        thisAtom.atomInvoNum = invoNum;
        return thisAtom;
      });
    }
  }

  get totalItems() {
    return this.itemAtomsArr.reduce((acc, curr) => {
      return acc + curr.atomItemQty;
    }, 0);
  }
}

export { Invoice_SR, InvoProduct };

//---- Orders ----

class Order_SR {
  constructor({
    invoice = "",
    email = "",
    street = "",
    city = "",
    state = "",
    zip = "",
    instructions = "",
  }) {
    this.salesRecordType = saleRecordTypes.order.k;
    this.instructions = instructions;
    this.invoice = invoice;
    this.contact = {
      email: email,
    };
    this.deliveryAddress = {
      street: street,
      city: city,
      state: state,
      zip: zip,
    };
  }
}

export { Order_SR };

class sessionItem {
  constructor({ itemNum = "", itemQty = 0, disposObj = {} }) {
    this.itemNum = itemNum;
    this.itemQty = itemQty;
    this.disposObj = disposObj;
  }
}

class singleDispo {
  constructor({ isResellable = false, dispoQty = 0, strLabel = "NO LABEL" }) {
    this.strLabel = strLabel;
    this.isDamaged = isResellable;
    this.dispoQty = dispoQty;
  }
}

export { sessionItem, singleDispo };

///////////////////////////////////////////////////////////////////////////////
//                LOCAL STATE STUFF
//////////////////////////////////////////////////////////////////////////////

class errorObj {
  constructor({ key = "", str = "", bgClickClears = true }) {
    this.key = key;
    this.str = str;
    this.bgClickClears = bgClickClears;
  }
}

export { errorObj };

const clearedInputs = {
  input1: "",
  input2: "",
  input3: "",
  input4: "",
};

export { clearedInputs };

const clearedErrors = {
  activeError1: null,
  activeError2: null,
};

export { clearedErrors };

const clearedActiveKeys = {
  activeKey1: "",
  activeKey2: "",
};

export { clearedActiveKeys };

const clearedActiveUI = {
  activeUI1: "",
  activeUI2: "",
  activeUI3: "",
};

export { clearedActiveUI };

const locStFields = {
  ...clearedInputs,
  ...clearedErrors,
  ...clearedActiveKeys,
  ...clearedActiveUI,
  _keyStr: "",
  activeMode1: "",
  activeMode2: "",
  activeData1: null,
  activeData2: null,
  oErrorObjects: {},
  init: {},
};

export { locStFields };

/*

*/

const makeLocStFields = ({
  _keyStr = "",
  input1 = "",
  input2 = "",
  input3 = "",
  input4 = "",
  activeError1 = null,
  activeError2 = null,
  activeKey1 = "",
  activeKey2 = "",
  activeMode1 = "",
  activeMode2 = "",
  activeData1 = null,
  activeData2 = null,
  activeUI1 = "",
  activeUI2 = "",
  activeUI3 = "",
  oErrorObjects = {},
}) => {
  const locStFields = {
    _keyStr,
    input1,
    input2,
    input3,
    input4,
    activeError1,
    activeError2,
    activeKey1,
    activeKey2,
    activeMode1,
    activeMode2,
    activeData1,
    activeData2,
    activeUI1,
    activeUI2,
    activeUI3,
    oErrorObjects,
  };
  const init = structuredClone(locStFields);
  delete init.oErrorObjects;
  locStFields.init = init;
  Object.freeze(locStFields.oErrorObjects);
  Object.freeze(locStFields.init);

  return locStFields;
};

export { makeLocStFields };

/*
class LocStFields {
  #inits;
  constructor({
    input1 = "",
    input2 = "",
    input3 = "",
    input4 = "",
    activeError1 = null,
    activeError2 = null,
    activeKey1 = "",
    activeKey2 = "",
    _keyStr = "",
    activeMode1 = "",
    activeMode2 = "",
    activeData1 = null,
    activeData2 = null,
    oErrorObjects = {},
    oLocStMethods = {},
    oCustomResetFieldArrs = {},
  }) {
    this.input1 = input1;
    this.input2 = input2;
    this.input3 = input3;
    this.input4 = input4;
    this.activeError1 = activeError1;
    this.activeError2 = activeError2;
    this.activeKey1 = activeKey1;
    this.activeKey2 = activeKey2;
    this._keyStr = _keyStr;
    this.activeMode1 = activeMode1;
    this.activeMode2 = activeMode2;
    this.activeData1 = activeData1;
    this.activeData2 = activeData2;
    this.oErrorObjects = oErrorObjects;
    this.oLocStMethods = oLocStMethods;
    // these are for more complex cases where I'm not just clearing a whole category of fields
    // Intent is for these be in response to specific interactions in the UI.
    this.oCustomResetFieldArrs = oCustomResetFieldArrs;
    this.#inits = { ...this };

    Object.freeze(this.oErrorObjects);
    Object.freeze(this.#inits);
    Object.freeze(this.oCustomResetFieldArrs);
  }

  showInits() {
    return this.#inits;
  }

  reset(aKeys) {
    aKeys.forEach((key) => {
      this[key] = this.#inits[key];
    });
  }

  resetError() {
    this.reset(["activeError1", "activeError2"]);
  }

  resetActiveKeys() {
    this.reset(["activeKey1", "activeKey2"]);
  }

  resetActiveUI() {
    this.reset(["activeUI1", "activeUI2", "activeUI3"]);
  }

  resetCustom(customResetKey) {
    this.reset(this.oCustomResetFieldArrs[customResetKey]);
  }

  resetAll() {
    Object.keys(this.#inits).forEach((key) => {
      this[key] = this.#inits[key];
    });
  }

}

export { LocStFields };

*/

const locStBaseMethods = {};

const baseLocState = {
  page: locStFields,
  rPan: locStFields,
  main: locStFields,
};

export { baseLocState };

const baseReturnState = ({
  sessionConfigs = {
    negativeReturnVals: true,
  },
  returnItems = [],
  totalReturnValue = new moneyObj({}),
  atomizedReturnItems = [],
  replacementItems = [],
  totalReplacementValue = new moneyObj({}),
  cashDeltaMO = new moneyObj({}),
  sessionInvos = {},
  returnReasons = {},
  returnReasonsRepo = {},
  returnItemDispos = [],
  oNavNodes = {},
  locSt = cloneDeep(baseLocState),
}) => {
  return {
    returnItems,
    atomizedReturnItems,
    totalReturnValue,
    replacementItems,
    totalReplacementValue,
    cashDeltaMO,
    returnReasonsRepo,
    returnItemDispos,
    sessionInvos,
    oNavNodes,
    locSt,
  };
};

export { baseReturnState };

const namedArray = ({ keyStr = "", value = [] }) => {
  return { keyStr, value };
};

export { namedArray };

class returnAtom {
  // Returns object of an item + qty that are identical in EVERY property we use.  Intended to go into an array.

  constructor({
    parentKey = "",
    atomInvoNum = "",
    atomMoneyObj = null,
    atomDispoKey = "",
    atomItemNum = "",
    atomItemQty = 0,
    bifrostKey = "",
  }) {
    this.atomItemNum = atomItemNum;
    this.parentKey = parentKey;
    this.atomInvoNum = atomInvoNum;
    this.atomMoneyObj = atomMoneyObj || new moneyObj({});
    this.atomDispoKey = atomDispoKey;
    this.atomItemQty = atomItemQty;
    this.bifrostKey = bifrostKey || this.atomItemNum;
  }

  get primaryKey() {
    return `${this.atomItemNum}&${this.atomInvoNum}&${this.unitTotal}`;
  }
}

const navNode = ({
  keyStr = "",
  routeStr = "",
  titleStr = "No Title",
  selected = false,
  disabled = true,
  breadcrumb = false, //may need to conditionally add a breadcrumb to the nav bar
  locSt = baseLocState,
}) => {
  return { keyStr, routeStr, titleStr, selected, disabled, breadcrumb, locSt };
};

export { returnAtom, navNode };
