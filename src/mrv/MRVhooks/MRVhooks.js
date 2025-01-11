import ProductContext from "../../store/product-context";
import InvoContext from "../../store/invo-context";
import { useOutletContext, useNavigate } from "react-router";

import { useContext } from "react";

import {
  Invoice_SR,
  sessionItem,
  InvoProduct,
  returnAtom,
  atomRelatives,
  singleDispo,
  moneyObj,
  baseReturnState,
  baseLocState,
  locStFields,
  clearedErrors,
  errorObj,
  navNode,
  SingleDispo,
  ItemDisposObj,
  itemReturnReasons,
  oReturnReason,
  parentChildGroup,
} from "../../globalFunctions/globalJS_classes";

import { at, clone, cloneDeep, isEmpty, isNaN, merge, subtract } from "lodash";

//// Money Handlers ////

const centsToDollars = (priceInCents = 4200) => {
  return Number.parseFloat(priceInCents / 100).toFixed(2);
};

const useCentsToDollars = () => {
  return centsToDollars;
};

const dollarsToCents = (priceInDollars) => {
  return Number.parseFloat(priceInDollars.toFixed(2)) * 100;
};

const useDollarsToCents = () => {
  return dollarsToCents;
};

const greenify = (numberVal) => {
  // This JUST returns a class.  Not the number, not a UI element.  Just a class.
  const isNeg = typeof numberVal === "number" && numberVal < 0;

  return isNeg ? "color__green__text" : "";
};

const mo_multiply = ({ targetMO, factor = 1 }) => {
  if (targetMO instanceof moneyObj) {
    const outMoneyObj = cloneDeep(targetMO);
    outMoneyObj.unitBaseValue *= factor;
    outMoneyObj.salesTax *= factor;
    return outMoneyObj;
  }
};

const moneyObjDelta = ({
  refundMo = new moneyObj({}),
  chargeMo = new moneyObj({}),
}) => {
  const outMoneyObj = new moneyObj({});

  outMoneyObj.unitBaseValue = chargeMo.unitBaseValue + refundMo.unitBaseValue;
  outMoneyObj.salesTax = chargeMo.salesTax + refundMo.salesTax;

  return outMoneyObj;
};

const atomsMonetizer = (arrayOfAtoms) => {
  // returns a new moneyObj populated from all atoms in the array
  // salesTaxRate set to undefined because there is no guarantee that all atoms will have the same salesTaxRate.
  const refAtom = new returnAtom({});

  let arrayToSum =
    arrayOfAtoms instanceof Object ? Object.values(arrayOfAtoms) : arrayOfAtoms;

  const outTotalMoneyObj = new moneyObj({ salesTaxRate: undefined });

  for (const thisAtom of arrayToSum) {
    const atomQty = thisAtom.atomItemQty;

    const scaledMoneyObj = mo_multiply({
      targetMO: thisAtom.atomMoneyObj,
      factor: atomQty,
    });

    outTotalMoneyObj.unitBaseValue += scaledMoneyObj.unitBaseValue;
    outTotalMoneyObj.salesTax += scaledMoneyObj.salesTax;
  }
  return outTotalMoneyObj;
};

const centStringifier = ({
  valueInCents,
  zeroAs0 = false,
  invertVal = false,
}) => {
  // this hook might be bullshit.

  // returns a dollar string from a cent value.  We should ONLY be using $ values in the display. All calculations should be done in cents.
  const outValInCents = invertVal ? -valueInCents : valueInCents;
  let outMoneyStr =
    outValInCents || zeroAs0 ? `$${centsToDollars(outValInCents)}` : "- -";
  return outMoneyStr;
};

export {
  centsToDollars,
  dollarsToCents,
  useCentsToDollars,
  useDollarsToCents,
  greenify,
  mo_multiply,
  atomsMonetizer,
  moneyObjDelta,
  centStringifier,
};

function childGrouper({ itemAtomsArr = [], itemCatelog = {} }) {
  // Accepts an array of itemAtoms and a productCatelog.  Returns an array of objects with children grouped by type.
  // Not intended to change the state.  Only for rendering UI.

  // Filter for only items without parents. Otherwise we would double-count children.
  const parentArr = itemAtomsArr.filter((thisAtom) => {
    return !thisAtom.parentKey;
  });

  // Function to be used in a map to find all children of a parent atom.
  const childCollector = (thisParentAtom) => {
    const outPCgroup = new parentChildGroup({ parentAtom: thisParentAtom });

    // filter ALL children with this parent.  May not need.
    outPCgroup.allChildren = itemAtomsArr.filter((thisAtom) => {
      return thisAtom.parentKey === thisParentAtom.atomItemNum;
    });

    // I still need to come up with a way of actually grouping these children.
    // It's gonna be some kind of class system but I'm not sure how to implement it yet.
  };

  const outGroupedArr = parentArr.map((thisParentAtom) => {
    return childCollector(thisParentAtom);
  });

  return outGroupedArr;
}

export { childGrouper };

function useChildGrouper() {
  // childGrouper as a hook.  Prepopulates with the normal values expected within
  const itemsCtx = useContext(ProductContext);

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  // childGrouper configured to target ProductContext
  const outChildGrouper = (itemAtomsArr = []) => {
    return childGrouper({
      itemAtomsArr: itemAtomsArr,
      itemCatelog: itemsCtx,
    });
  };

  return outChildGrouper;
}

export { useChildGrouper };

function returnReasoner(sessionState) {
  const oldReturnReasons = cloneDeep(sessionState.returnReasons);
  const sessionItems = sessionState.returnItems;
  const refbaseReturnState = baseReturnState({});
  const refItemAtom = new returnAtom({});
  const refReturnReasons = itemReturnReasons({});
  const refOReturnReason = oReturnReason({});

  /////////////////////////////////////////////////
  ///////////////// The Old ///////////////////////
  /////////////////////////////////////////////////

  // start with empty ReturnReasons object so that deleted items don't persist.
  const outReturnReasons = {};

  // loop through the session items to ensure no return reasons for deleted items persist.
  for (const thisItem of sessionItems) {
    console.log("thisItem", thisItem);
    // making a new returnReason object to ensure no stale data is present.

    const outItemReasons = itemReturnReasons({
      itemAtom: thisItem,
    });

    // collect the old reasons if they exist, otherwise an empty object.
    const oldReasons = {
      ...oldReturnReasons?.[thisItem.atomItemNum]?.oAllItemReasons,
    };

    // merge the old reasons (if any) with the new reasons.
    outItemReasons.oAllItemReasons = {
      ...outReturnReasons.oAllItemReasons,
      ...oldReasons,
    };

    // HAVE NOT yet verified that this actually preserves the old reasons.  I think it does.

    outReturnReasons[thisItem.atomItemNum] = outItemReasons;

    /////////////////////////////////////////////////////////////
    ///////////////////////// The New ///////////////////////////
    /////////////////////////////////////////////////////////////

    const outReturnReasonsRepo = {};
  }

  // returns the new returnReasons object.  We still have to set it in the state.
  return outReturnReasons;
}

const returnReasonRepoMgr = (sessionState) => {
  const refDefaultState = baseReturnState({});
  const refItemAtom = new returnAtom({});
  const refReturnReasons = itemReturnReasons({});
  const refOReturnReason = oReturnReason({});
  const refBaseLocState = baseLocState;

  const sessionItems = sessionState.returnItems;
  const oldReasonsRepo = sessionState.returnReasonsRepo;

  // this starts empty to make sure that return reasons for deleted items don't persist.
  const outReturnReasonsRepo = {};

  for (const thisItem of sessionItems) {
    //ItemReturnReasons gets recreated each time to ensure itemAtom freshness.
    const outFreshItemReasons = itemReturnReasons({ itemAtom: thisItem });
    const oldReasons = oldReasonsRepo?.[thisItem.atomItemNum]?.oAllItemReasons;

    // if oldReasons exists, assign it to the fresh itemReturnReasons obj.
    oldReasons && (outFreshItemReasons.oAllItemReasons = oldReasons);

    outReturnReasonsRepo[thisItem.atomItemNum] = outFreshItemReasons;
  }

  return outReturnReasonsRepo;
};

// I want to scrap this once I am sure it's not needed in Exchanges.
const populateDisposArr = ({ sessionSt = baseReturnState({}) }) => {
  // returns an array of SingleDispo objects from an array of return items.
  const refItemDisposObj = new ItemDisposObj({});
  const refSingleDispo = new SingleDispo({});
  const refItemAtom = new returnAtom({});
  const refDefaultState = baseReturnState({});

  const RtrnItemsList = cloneDeep(sessionSt.returnItems);

  const defaultDispos = {
    noWorky: new SingleDispo({
      isDamaged: true,
      keyStr: "noWorky",
      strLabel: "Doesn't Work",
    }),
    missingParts: new SingleDispo({
      isDamaged: true,
      keyStr: "missingParts",
      strLabel: "Missing Parts",
    }),
    rusted: new SingleDispo({
      isDamaged: true,
      keyStr: "rusted",
      strLabel: "Rusted Metal",
    }),
    cosmetic: new SingleDispo({
      isDamaged: true,
      keyStr: "cosmetic",
      strLabel: "Cosmetic",
    }),

    // Didn't Want / Need Reasons

    boughtWrong: new SingleDispo({
      isDamaged: false,
      keyStr: "boughtWrong",
      strLabel: "Bought Wrong Item",
    }),
    foundCheaper: new SingleDispo({
      isDamaged: false,
      keyStr: "foundCheaper",
      strLabel: "Found Better Price",
    }),
    notNeeded: new SingleDispo({
      isDamaged: false,
      keyStr: "notNeeded",
      strLabel: "Item Not Needed",
    }),
    tooMany: new SingleDispo({
      isDamaged: false,
      keyStr: "tooMany",
      strLabel: "Bought Too Many",
    }),
    other: new SingleDispo({
      isDamaged: false,
      keyStr: "other",
      strLabel: "Other Reason",
    }),
  };

  const aDisposArr = RtrnItemsList.map((iAtom) => {
    const outDispoObj = new ItemDisposObj({
      dispoItemNum: iAtom.atomItemNum,
      itemQty: iAtom.atomItemQty,
      dispoItemAtom: iAtom,
      allDisposObj: defaultDispos,
    });
    return outDispoObj;
  });
  return aDisposArr;
};

export { populateDisposArr };

function useNodeNav() {
  const navigate = useNavigate();

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const nodeNav = (targetNodeKey = "") => {
    const refBreadcrumbNode = navNode({});
    const refDefaultState = baseReturnState({});
    const refBaseLocState = baseLocState;

    const thisTargetNode = sessionMRV.oNavNodes[targetNodeKey];

    if (thisTargetNode) {
      const outNavNodesObj = cloneDeep(sessionMRV.oNavNodes);

      // all nodes prior to the target remain enabled.
      let nodeAfterTarget = false;

      for (const thisNode of Object.values(outNavNodesObj)) {
        thisNode.selected = false; // deselect all nodes
        thisNode.disabled = nodeAfterTarget; // deactivate all nodes

        // once target node is reached, flip bool so all subequent nodes are disabled.
        if (thisNode.keyStr === targetNodeKey) {
          nodeAfterTarget = true;
        }
      }

      // activate the target node and make it available.
      outNavNodesObj[targetNodeKey].selected = true;

      setSessionMRV((draft) => {
        draft.oNavNodes = outNavNodesObj;
        draft.locSt = thisTargetNode.locSt;
      });
      navigate(outNavNodesObj[targetNodeKey].routeStr);
    }
  };

  return nodeNav;
}

export { useNodeNav };

////////////////////////////////////////////////////////////////////////////////
/////////////////         Session Input Handlers       /////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Make a change to the items in the current session state.

function useSetLocStFields(locStKey = "page") {
  // merges newFields into the specified locSt object.
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const setLocStFields = (oNewFields = {}) => {
    setSessionMRV((draft) => {
      draft.locSt[locStKey] = { ...draft.locSt[locStKey], ...oNewFields };
    });
  };
  return setLocStFields;
}

export { useSetLocStFields };

function useResetLocStFields(locStKey) {
  // loops through the locSt object and merges the specified replacement fields into the specified nodes.
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const resetLocStFields = ({
    input1 = false,
    input2 = false,
    input3 = false,
    input4 = false,
    inputALL = false,
    activeError1 = false,
    activeError2 = false,
    activeErrorALL = false,
    activeKey1 = false,
    activeKey2 = false,
    activeKeyALL = false,
    activeMode1 = false,
    activeMode2 = false,
    activeModeALL = false,
    activeData1 = false,
    activeData2 = false,
    activeDataALL = false,
    activeUI1 = false,
    activeUI2 = false,
    activeUI3 = false,
    activeUIALL = false,
    EVERYONE = false,
  }) => {
    // returns a new locSt object with all fields cleared.
    const refDefaultState = baseReturnState({});
    const refBaseLocState = baseLocState;
    const refLocFields = locStFields;

    if (!sessionMRV.locSt[locStKey]) {
      return false; // I might reuse some functions and this lets me dip out if the locStKey is invalid.
    }

    const args = {
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
    };

    // the ALLs are for convenience.  They will override any other values.
    if (inputALL) {
      [args.input1, args.input2, args.input3, args.input4] = [
        true,
        true,
        true,
        true,
      ];
    }

    if (activeErrorALL) {
      [args.activeError1, args.activeError2] = [true, true];
    }

    if (activeKeyALL) {
      [args.activeKey1, args.activeKey2] = [true, true];
    }

    if (activeModeALL) {
      [args.activeMode1, args.activeMode2] = [true, true];
    }

    if (activeDataALL) {
      [args.activeData1, args.activeData2] = [true, true];
    }

    if (activeUIALL) {
      [args.activeUI1, args.activeUI2, args.activeUI3] = [true, true, true];
    }

    let outLocSt = {};
    const init = sessionMRV.locSt[locStKey].init;

    for (const [key, value] of Object.entries(args)) {
      if (value) {
        outLocSt[key] = init[key];
      }
    }

    // shortcut to reset all fields.
    if (EVERYONE) {
      outLocSt = cloneDeep(init);
    }

    setSessionMRV((draft) => {
      draft.locSt[locStKey] = { ...draft.locSt[locStKey], ...outLocSt };
    });
  };
  return resetLocStFields;
}

export { useResetLocStFields };

function setSessionItem({
  arrToSet = [],
  REF_routeStr____returnItems__newItems__replacementItemsIsDEPRECATED,
  itemAtom = new returnAtom({}),
  newQty = 0,
  actionType = "add",
  REF_actionType____add_edit_remove_subtract,
  customMatchignFn = null,
}) {
  const refDefaultState = baseReturnState({});
  const refAtom = new returnAtom({});

  // locate the corresponding atom in the routeStr in the session state.

  const thisItemNum = itemAtom.atomItemNum;
  console.log(thisItemNum);

  let outItemsArr = cloneDeep(arrToSet);

  let targetAtomIndex = locateAtom({
    itemNum: thisItemNum,
    arrToSearch: outItemsArr,
    asIndex: true,
    customMatchignFn: customMatchignFn,
  });

  // Record repos for items should only have 1 atom per itemNum.  If there are more, I done fucked up.
  const qtyOfMatchingAtoms = outItemsArr.filter((atom) => {
    return atom.atomItemNum === thisItemNum;
  }).length;

  // universal validity checks.  If something's wrong I need to terminate before any other logic runs.

  //

  const createIfEmpty = () => {
    if (targetAtomIndex === -1) {
      outItemsArr.push(
        new returnAtom({ atomItemNum: thisItemNum, atomItemQty: 0 })
      );
      targetAtomIndex = outItemsArr.length - 1;
    }
  };

  const actionMethods = {
    add: () => {
      createIfEmpty();
      outItemsArr[targetAtomIndex].atomItemQty += Number(newQty);
    },
    edit: () => {
      createIfEmpty();
      outItemsArr[targetAtomIndex].atomItemQty = Number(newQty);
    },
    remove: () => {
      outItemsArr = outItemsArr.filter((thisItem) => {
        // Keep only atoms that don't match the itemNum or have the itemNum as a parent.
        const keepThisAtom =
          thisItem.atomItemNum !== thisItemNum &&
          thisItem.parentKey !== thisItemNum;
        return keepThisAtom;
      });
    },
    subtract: () => {
      // currently does not handle child items.  Not sure if it should.

      outItemsArr[targetAtomIndex].atomItemQty -= Number(newQty);
      console.log("Deducted Qty:", outItemsArr[targetAtomIndex].atomItemQty);
      // if the atom has been depleted...
      if (outItemsArr[targetAtomIndex].atomItemQty <= 0) {
        // remove it from the array.
        outItemsArr = outItemsArr.filter((thisItem) => {
          return thisItem.atomItemNum !== thisItemNum;
        });
      }
    },

    failFunc: () => {
      console.log("You're setting Session Items wrong.");
      return false;
    },
  };

  // if the user didn't specify a valid action, warn and terminate.
  const methodToUse = actionMethods?.[actionType] || actionMethods.failFunc;

  // perform the provided action.
  methodToUse();

  console.log("outItemsArr", outItemsArr);

  return outItemsArr;
}

export { setSessionItem };

function useSetSessionItems({ targetStateArrKey = "returnItems" }) {
  const itemsCtx = useContext(ProductContext);

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const outFn = ({ itemAtom, newQty, actionType }) => {
    let outSessionState = cloneDeep(sessionMRV);

    outSessionState[targetStateArrKey] = setSessionItem({
      arrToSet: sessionMRV[targetStateArrKey],
      itemAtom: itemAtom,
      newQty: newQty,
      actionType: actionType,
    });

    outSessionState = returnAutoDeriver(outSessionState);

    setSessionMRV(() => {
      return outSessionState;
    });
  };

  return outFn;

  /*
  
  */
}

function locateAtom({
  itemNum = "",
  asIndex = false,
  arrToSearch = [],
  customMatchignFn = false,
  REF__customMatchignFnParam____arrAtom,
}) {
  // returns the index of the atom in the array, or the atom itself.
  const refAtom = new returnAtom({});
  const refDefaultState = baseReturnState({});

  // most of hte time we will just be looking for the atomItemNum.
  const matchingFn = customMatchignFn
    ? customMatchignFn
    : ({ arrAtom }) => {
        return arrAtom.atomItemNum === itemNum;
      };

  const atomIndex = arrToSearch.findIndex((arrAtom) => {
    return matchingFn({ arrAtom: arrAtom });
  });

  const outAtom = atomIndex !== -1 ? arrToSearch[atomIndex] : false;
  return asIndex ? atomIndex : outAtom;
}

export { locateAtom };

function useFindAtom() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;

  // TODO - getAtomIndex is a cleaner, de-hooked version of this function.  I should refactor this to use getAtomIndex.

  const findAtom = ({
    itemNum = "",
    asIndex = false,
    itemRepo = "returnItems",
    REF_itemRepo____returnItems,
  }) => {
    const refAtom = new returnAtom({});
    const refDefaultState = baseReturnState({});
    const itemsArr = sessionMRV[itemRepo];
    const atomIndex = itemsArr.findIndex((thisAtom) => {
      return thisAtom.atomItemNum === itemNum;
    });

    const outAtom = atomIndex !== -1 ? itemsArr[atomIndex] : false;
    return asIndex ? atomIndex : outAtom;
  };

  return findAtom;
}

export { useFindAtom };

// Make a change to the invos in the Session state
function useSetSessionInvos() {
  const invosCtx = useContext(InvoContext);

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const setSessionInvos = ({
    invosRtStr = "sessionInvos",
    invoNum = 0,
    actionType = "add",
    add_remove = "add remove",
  }) => {
    const refDefaultState = baseReturnState({});

    let outSessionState = cloneDeep(sessionMRV);

    if (!invosCtx[invoNum]) {
      return false;
    }

    const actionMethods = {
      add: () => {
        outSessionState[invosRtStr][invoNum] = cloneDeep(invosCtx[invoNum]);
      },
      remove: () => {
        delete outSessionState[invosRtStr][invoNum];
      },
    };

    actionMethods[actionType]();
    outSessionState = returnAutoDeriver(outSessionState);
    setSessionMRV(() => {
      return outSessionState;
    });
  };

  return setSessionInvos;
}

////////////////////////////////////////////////////////////////////////////////
/////////////////         Session Value Derivers       /////////////////////////
////////////////////////////////////////////////////////////////////////////////

const returnAtomizer = ({
  sessionItemsArr = [],
  sessionInvosObj = {},
  sessionState = baseReturnState({}), // not configured to use yet.
}) => {
  // accepts an object of Session Items and an array of Session Invos

  const refInvoItem = new Invoice_SR({});
  const refInvoProd = new InvoProduct({});
  const refSessionItem = new sessionItem({});
  const refSingleDispo = new singleDispo({});
  const refDefaultState = baseReturnState({});

  // Arrays of results for each layer of atomization.  Add to as needed.  Destructuring assignment?

  let aAtomizedByInvoice = [];

  // Gets progressively modified to the results of each completed atomization layer.
  let outFullyAtomizedArr = [];

  // Standing records of UM values.  Should be cleared/decremented but never reset.
  let aUM_InvoicedItemAtoms = Object.values(cloneDeep(sessionInvosObj)).flatMap(
    (thisInvo) => {
      return thisInvo.itemAtomsArr;
    }
  );

  let aUM_ReturnItemAtoms = cloneDeep(sessionItemsArr);

  // SHARED FUNCTIONS //////////////////////////////////////////////////
  const atomHasQty = (thisAtom) => {
    return thisAtom.atomItemQty;
  };

  const clearEmptyAtoms = () => {
    //Should only need to filter the UM arrays.  Base values never change and post-atomization arrays should always be clean.
    aUM_InvoicedItemAtoms = aUM_InvoicedItemAtoms.filter(atomHasQty);
    aUM_ReturnItemAtoms = aUM_ReturnItemAtoms.filter(atomHasQty);
    outFullyAtomizedArr = outFullyAtomizedArr.filter(atomHasQty);
  };

  // Turns the UMitems into atoms. //////////////////////////////////////////

  /*
    Outer loop always modifies cloned outFullyAtomizedArr.
    Inner loop always modifies next UM array in sequence.
  */

  outFullyAtomizedArr = cloneDeep(aUM_ReturnItemAtoms);

  /////////////////           Atomizaton Layers         //////////////////////////

  // Splits atoms by invo, or no invo if empty. ////////////////////////////////////////

  LoopAtoms_Items_X_Invos: for (const thisItemAtom of outFullyAtomizedArr) {
    const refInvoItem = new Invoice_SR({});
    const refInvoProd = new InvoProduct({});
    const refAtom = new returnAtom({});

    // TODO - call sorting function here.

    for (const thisInvoItemAtom of aUM_InvoicedItemAtoms) {
      // Only operate on items with this itemNum.

      if (thisInvoItemAtom.atomItemNum === thisItemAtom.atomItemNum) {
        const nMatchedQty = Math.min(
          thisItemAtom.atomItemQty,
          thisInvoItemAtom.atomItemQty
        );

        // decrement the atomItem and invoItem qtys
        thisItemAtom.atomItemQty -= nMatchedQty;
        thisInvoItemAtom.atomItemQty -= nMatchedQty;

        // Increment Output
        const outAtomXinvo = cloneDeep(thisInvoItemAtom);

        outAtomXinvo.atomItemQty = nMatchedQty;

        aAtomizedByInvoice.push(outAtomXinvo);

        //Cleanup
        clearEmptyAtoms();
        if (!thisItemAtom.atomItemQty) continue LoopAtoms_Items_X_Invos;
      }
    } // ------------- End Of Inner Loop --------------------

    // Continue never triggered, so this atom has some unmatched qty.  Push it.
    aAtomizedByInvoice.push(thisItemAtom);
  }

  outFullyAtomizedArr = cloneDeep(aAtomizedByInvoice);

  return outFullyAtomizedArr;
};

const useReturnAtomizer = () => {
  return returnAtomizer;
};

//// Basic utility functions for the Universal Atomizer. ////

const baseAtomizerComparison = ({ repo1Atom, repo2Atom }) => {
  return repo1Atom.atomItemNum === repo2Atom.atomItemNum;
};
const baseAtomizerSetMerged = ({ repo1Atom, repo2Atom, mergedAtom }) => {
  const refAtom = new returnAtom({});

  const newVals = {
    peerItem: repo1Atom.atomItemNum,
    transactionType: "likeExch",
  };
  const outMergedAtom = {
    ...cloneDeep(mergedAtom),
    ...cloneDeep(repo1Atom),
    ...newVals,
  };
  const refMoneyObj = new moneyObj({});
  outMergedAtom.atomMoneyObj.invertValue();
  return outMergedAtom;
};

export { baseAtomizerComparison, baseAtomizerSetMerged };

const primaryAtomizer = ({
  // takes 2 atom arrays and returns 3 - one for the merged atoms, and the leftovers from the 2 original repos.
  // repos must be pre-atomized and iterable.
  repo1 = [],
  repo2 = [],

  // Where we determine what counts as a match.
  comparisonFn = baseAtomizerComparison,

  // the format of the atoms in the merged array.  Normally a returnAtom.
  mergedAtomTemplate = new returnAtom({}),

  // Value to be decremented in repo atoms and incremented in merged atoms.  Normally qty or money.
  mergeUnitKey = "atomItemQty",

  // set other fiels of mergedAtom.
  setMergedAtomFn = baseAtomizerSetMerged,
}) => {
  let unmerged1 = cloneDeep(repo1);
  let unmerged2 = cloneDeep(repo2);
  let mergedRepo = [];

  // Checks if an atom has any value left.
  const atomNotDepleted = (thisAtom) => {
    return thisAtom[mergeUnitKey];
  };
  // Removes depleted atoms from the unmerged arrays.
  const clearDepletedAtoms = () => {
    // this lets me use For loops without worrying about the array length changing.
    unmerged1 = unmerged1.filter(atomNotDepleted);
    unmerged2 = unmerged2.filter(atomNotDepleted);
  };

  Loop_L1: for (const repo1Atom of unmerged1) {
    Loop_L2: for (const repo2Atom of unmerged2) {
      const isMatch = comparisonFn({ repo1Atom, repo2Atom });

      if (isMatch) {
        // User-defined fn to set other fields of the merged atom before clearing 1 or both depleted repoAtoms.
        // Run before in/decrement so I can easily merge values.
        let outMergedAtom = setMergedAtomFn({
          repo1Atom,
          repo2Atom,
          mergedAtom: mergedAtomTemplate,
        });

        // no validation.  If the comparison fails, I want it to break.
        const sharedQty = Math.min(
          repo1Atom[mergeUnitKey],
          repo2Atom[mergeUnitKey]
        );

        repo1Atom[mergeUnitKey] -= sharedQty;
        repo2Atom[mergeUnitKey] -= sharedQty;
        outMergedAtom[mergeUnitKey] = sharedQty; // value might be set in setMergedAtomFn, so just assign the shared value.

        const L1_AtomDepleted = !repo1Atom?.[mergeUnitKey];

        mergedRepo.push(outMergedAtom);
        clearDepletedAtoms();
        if (L1_AtomDepleted) continue Loop_L1;
      }
    }
  }
  // Any additional assignment can be done afterwards, since this does not directly modify the state.
  return { mergedRepo, unmerged1, unmerged2 };
};

export { primaryAtomizer };

function atomAggregator({
  // Don't think we need this anymore.  Created and deprecated in the same day?

  // Atomization deconstructs atoms by every possible differentiator.  This function re-aggregates atoms for cases where certain differentiators are not relevant.  Incoming atoms should be pre-filtered for identicality in the relevant fields.

  // This function aggregates all incrementable fields but assigns no other values.
  aAtomsToAggregate = [],
  // Use this to assign the fields all incoming atoms share so they can be represented in the aggregated atom.
  atomWithSharedValues = new returnAtom({}),
}) {
  let outAggregatedAtom = cloneDeep(atomWithSharedValues);
  // I might eventually put all the atomsMonetizer logic in here, but for now this is fine.
  outAggregatedAtom.atomMoneyObj = atomsMonetizer(aAtomsToAggregate);

  for (const thisAtom of aAtomsToAggregate) {
    outAggregatedAtom.atomItemQty += thisAtom.atomItemQty;
  }
  return outAggregatedAtom;
}

export { atomAggregator };

function atomFuser({
  // takes an array of atoms, fuses those that share vals in aIdenticalityKeys, and returns an object of fused atoms.
  aIdenticalityKeys = [], // field keys to identify identical atoms.  If empty, fuses all atoms.
  REF__identicalityFields____atomItemNum__parentKey__bifrostKey,
  aAtomsToFuse = [],
}) {
  // Atomization deconstructs atoms by every possible differentiator.  This function re-aggregates atoms for cases where certain differentiators are not relevant.  Incoming atoms should be pre-filtered for identicality in the relevant fields.

  // Overall philosophy is that we store record repos, derive a single fully atomized repo per cart, then fuse atoms as needed at the point of consumption.
  const oFusedAtoms = {};

  for (const thisAtom of aAtomsToFuse) {
    // get the values of the fields that identify identical atoms.
    const aIdenticalityVals = aIdenticalityKeys.map((thisField) => {
      return thisAtom[thisField];
    });

    const thisKey =
      aIdenticalityKeys.length === 0 ? "ALL" : aIdenticalityVals.join("_");

    // if the atom doesn't exist, create it.
    if (!oFusedAtoms[thisKey]) {
      // salesTaxRate is undefined because we can't guarantee it's the same for all atoms.
      oFusedAtoms[thisKey] = new returnAtom({
        atomMoneyObj: new moneyObj({ salesTaxRate: undefined }),
      });
      // Since the values of these fields determine identicality, they'll be shared by any atoms getting fused to this key.
      for (const thisField of aIdenticalityKeys) {
        oFusedAtoms[thisKey][thisField] = thisAtom[thisField];
      }
    }

    // Increment quantity.
    const atomQty = thisAtom.atomItemQty;
    oFusedAtoms[thisKey].atomItemQty += atomQty;

    // Increment money values.
    const scaledMoneyObj = mo_multiply({
      targetMO: thisAtom.atomMoneyObj,
      factor: atomQty,
    });

    const cashRt = oFusedAtoms[thisKey].atomMoneyObj;

    cashRt.unitBaseValue += scaledMoneyObj.unitBaseValue;
    cashRt.salesTax += scaledMoneyObj.salesTax;
  }

  return oFusedAtoms;
}

export { atomFuser };

function atomRelationizer({ mainAtom = new returnAtom({}), searchArray = [] }) {
  if (mainAtom.parentKey) {
    // Any child atom is going to end up in its parent collection, so we need to terminate or we'll get duplicates.
    return false;
  }
  // identifies all atoms in searchArray that share common relationships with mainAtom.
  const outAtomRelatives = new atomRelatives({
    mainAtom: mainAtom,
  });

  outAtomRelatives.aAllChildren = searchArray.filter((thisAtom) => {
    return thisAtom.parentKey === mainAtom.atomItemNum;
  });

  // add in more filtered relationships as needed.

  return outAtomRelatives;
}

export { atomRelationizer };

// Specific applications of the primaryAtomizer function.  These are the most common use cases.

const newItemAtomizer = ({ atomizedReturnItemsArr = [], newItemsArr }) => {
  const baseComparisonFn = ({ repo1Atom, repo2Atom }) => {
    return repo1Atom.atomItemNum === repo2Atom.atomItemNum;
  };

  let outAtomizedNewItems = [];

  // Find Like Item Matches
  let oAtomizedByLikeExch = primaryAtomizer({
    repo1: atomizedReturnItemsArr,
    repo2: newItemsArr,
    comparisonFn: baseComparisonFn,
    mergedAtomTemplate: new returnAtom({}),
    mergeUnitKey: "atomItemQty",
    setMergedAtomFn: ({ repo1Atom, repo2Atom, mergedAtom }) => {
      const refAtom = new returnAtom({});

      const newVals = {
        peerItem: repo1Atom.atomItemNum,
        transactionType: "likeExch",
      };
      const outMergedAtom = {
        ...cloneDeep(mergedAtom),
        ...cloneDeep(repo1Atom),
        ...newVals,
      };
      const refMoneyObj = new moneyObj({});
      outMergedAtom.atomMoneyObj.invertValue();
      return outMergedAtom;
    },
  });

  // Any items that were not matched to a return item are new sales.
  const assignSaleTransType = oAtomizedByLikeExch.unmerged2.map((thisAtom) => {
    const refAtom = new returnAtom({});
    const newVals = { transactionType: "sale" };
    return { ...thisAtom, ...newVals };
  });

  // We still want to see the new items that didn't match to a return item, so we merge the 2 arrays.
  outAtomizedNewItems = [
    ...oAtomizedByLikeExch.mergedRepo,
    ...assignSaleTransType,
  ];

  // placeholder.  Define once we start covering other transaction types.

  return outAtomizedNewItems;
};

const autoAddChildAtoms = (clonedDraft) => {
  // This function is to add child atoms from session invoices to the returnItems array if their parent is already in the array.

  // Papa?  Is it you?

  const refSessionState = baseReturnState({});
  const refItemAtom = new returnAtom({});

  const returnedItemsArr = clonedDraft.returnItems;
  const sessionInvos = clonedDraft.sessionInvos;
  // array of all atoms in all invoices in the session.
  const itemsSold = Object.values(sessionInvos).flatMap((thisInvo) => {
    return thisInvo.itemAtomsArr;
  });

  for (const thisAtom of itemsSold) {
    // check if atom has a parent
    const parentItemNum = thisAtom.parentKey;

    // see if the parent is in the returnItems
    const parentReturned =
      returnedItemsArr.filter((thisItem) => {
        return thisItem.atomItemNum === parentItemNum;
      }).length > 0;

    // If this child/parent pair is already in the returnItems, we don't want to overwrite its value.
    const childReturned =
      returnedItemsArr.filter((thisItem) => {
        return (
          thisItem.atomItemNum === thisAtom.atomItemNum
          //&& thisItem.parentKey === parentItemNum
        );
      }).length > 0;

    // if this is a child item and it is not already in the returnItems but its parent is, add it.
    if (parentItemNum && parentReturned && !childReturned) {
      /* */
      const outAtom = cloneDeep(thisAtom);
      outAtom.atomItemQty = 0;
      outAtom.atomInvoNum = "";
      outAtom.atomMoneyObj = new moneyObj({});

      clonedDraft.returnItems.push(outAtom);
    }
  }
  return clonedDraft;
};

function returnAutoDeriver(clonedDraft) {
  // purpose is to perform all derivations needed when performing a return.
  // returns a new draft, which must be assigned to the state.

  const refDefaultState = baseReturnState({});
  let outSessionState = cloneDeep(clonedDraft);

  // auto-add child atoms if their parent is in the returnItems
  outSessionState = autoAddChildAtoms(outSessionState);

  outSessionState.returnReasons = returnReasoner(outSessionState);

  outSessionState.returnReasonsRepo = returnReasonRepoMgr(outSessionState);

  // atomize the returnItems
  outSessionState.atomizedReturnItems = returnAtomizer({
    sessionItemsArr: outSessionState.returnItems,
    sessionInvosObj: outSessionState.sessionInvos,
  });

  // atomize the newItems
  outSessionState.atomizedNewItems = newItemAtomizer({
    atomizedReturnItemsArr: outSessionState.atomizedReturnItems,
    newItemsArr: outSessionState.newItems,
  });

  // calculate the sum of all atoms matched to invoices.
  outSessionState.totalReturnValue = atomsMonetizer(
    outSessionState.atomizedReturnItems
  );

  outSessionState.totalNewItemValue = atomsMonetizer(
    outSessionState.atomizedNewItems
  );

  outSessionState.cashDeltaMO = moneyObjDelta({
    refundMo: outSessionState.totalReturnValue,
    chargeMo: outSessionState.totalNewItemValue,
  });

  outSessionState.wholeBigNumber = outSessionState.totalReturnValue.unitTotal;

  return outSessionState;
}

const useReturnAutoDeriver = () => {
  return returnAutoDeriver;
};

export {
  returnAutoDeriver,
  useReturnAtomizer,
  useSetSessionItems,
  useSetSessionInvos,
  useReturnAutoDeriver,
};
