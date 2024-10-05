//---- Product ----

import { cloneDeep } from "lodash";

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

  invertValue() {
    this.unitBaseValue = -this.unitBaseValue;
    this.salesTax = -this.salesTax;
  }

  // derived values are never modified directly so they are provided as getters.
  get subTotal() {
    return this.unitBaseValue;
  }
  get unitTotal() {
    return this.subTotal + this.salesTax || 0;
  }
}

class RejectionObj {
  constructor({ keyStr = "", strLabel = "NO LABEL", rejectsArr = [] }) {
    this.keyStr = keyStr;
    this.strLabel = strLabel;
    this.rejectsArr = rejectsArr;
  }
}

export { RejectionObj };

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
  return {
    keyStr,
    strLabel,
    isDefective,
    reasonQty,
    isChosen,
  };
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

  return {
    itemAtom,
    oAllItemReasons,
    itemQty,
    itemNum,
    defectiveQty() {
      // loops thru all reasons and sums their qtys.
      // No check for defective b/c OK reasons don't get individual qtys.
      const outQty = Object.values(this.oAllItemReasons).reduce((acc, curr) => {
        return acc + curr.reasonQty;
      }, 0);
      return outQty;
    },
    qtySansReason() {
      return this.itemQty - this.defectiveQty();
    },
    okReasonsQty() {
      // OK reasons never have a qty, so we just need to know if any are chosen.
      const hasOK = Object.values(this.oAllItemReasons).find((thisReason) => {
        return thisReason.isChosen;
      });
      // If any OK reasons are chosen, the value is whatever is left after the defective reasons.
      return hasOK ? Math.max(this.qtySansReason(), 0) : 0;
    },
    allReasonsQty() {
      return this.defectiveQty() + this.okReasonsQty();
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

const locStBaseMethods = {};

const baseLocState = {
  page: locStFields,
  rPan: locStFields,
  main: locStFields,
};

export { baseLocState };

const baseReturnState = ({
  returnItems = [],
  totalReturnValue = new moneyObj({}),
  atomizedReturnItems = [],
  newItems = [],
  atomizedNewItems = [],
  totalNewItemValue = new moneyObj({}),
  cashDeltaMO = new moneyObj({}),
  sessionInvos = {},
  returnReasonsRepo = {},
  oNavNodes = {},
  locSt = cloneDeep(baseLocState),
  // old, deprecate once we're sure we don't need these.
  totalReplacementValue = new moneyObj({}),
  replacementItems = [],
  returnReasons = {},
  returnItemDispos = [],
}) => {
  return {
    returnItems,
    totalReturnValue,
    atomizedReturnItems,
    newItems,
    totalNewItemValue,
    atomizedNewItems,

    cashDeltaMO,
    returnReasonsRepo,
    sessionInvos,
    oNavNodes,
    locSt,
    // old, deprecate once we're sure we don't need these.
    returnItemDispos,
    replacementItems,
    returnReasons,
    totalReplacementValue,
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
    transactionType = null,
    peerItem = null,
    REF_transactionType____sale__likeExch__unlikeExch__return = "",
  }) {
    this.atomItemNum = atomItemNum;
    this.parentKey = parentKey;
    this.atomInvoNum = atomInvoNum;
    this.atomMoneyObj = atomMoneyObj || new moneyObj({});
    this.atomDispoKey = atomDispoKey;
    this.atomItemQty = atomItemQty;
    this.bifrostKey = bifrostKey || this.atomItemNum;
    this.transactionType = transactionType;
    this.peerItem = peerItem;
  }

  get primaryKey() {
    return `${this.atomItemNum}&${this.atomInvoNum}&${this.unitTotal}`;
  }
}

class atomRelatives {
  // Standard container for a main atom and all its children, accessories, and services.
  // Does NOT contain any filtering logic.  That is handled by atomRelationizer.
  constructor({
    mainAtom = new returnAtom({}),
    aAllChildren = [],
    aAccessories = [],
    aServices = [],
  }) {
    this.mainAtom = mainAtom;
    this.aAllChildren = aAllChildren;
    this.aAccessories = aAccessories;
    this.aServices = aServices;
    this.parentAndChildren = [mainAtom, ...aAllChildren];
  }
}

export { atomRelatives };

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
