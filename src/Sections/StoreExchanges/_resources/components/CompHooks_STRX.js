import { find, set } from "lodash";
import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import { useCompHooks_MRV } from "../../../../mrv/mrv-components/CompHooksMRV";

import {
  useResetLocStFields,
  useSetLocStFields,
  useFindAtom,
  useNodeNav,
  useSetSessionItems,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

function useLocStMethods_STRX() {
  const mrvCtx = useOutletContext();
  const nodeNav = useNodeNav();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSession = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const pageLocSt = locStRt.page;
  const setSessionItems = useSetSessionItems();

  const findAtom = useFindAtom();
  const outMethods = {};

  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");

  // Shared Methods -------------------------------------

  const AddItemsAndInvos = () => {
    const resetAllEntry30LS = useResetLocStFields("AllEntry30");
    const resetReasonPickerLS = useResetLocStFields("ReasonPickerSC");
    const setReasonPickerLS = useSetLocStFields("ReasonPickerSC");
    const setAllEntry30LS = useSetLocStFields("AllEntry30");

    const mrvMethods = useCompHooks_MRV().oReasonPicker_SC();

    const lsMethods = {
      basicClear: () => {
        console.log("Ya Basic");
        resetPageLS({ activeErrorALL: true });
        resetAllEntry30LS({ activeErrorALL: true });
      },

      continue: () => {
        const allReceipted = true; // will populate later.
        const allValid = Object.values(sessionMRV.returnItems).every(
          (itemAtom) => {
            return mrvMethods.isReasonQtyValid({
              itemAtom: itemAtom,
              validCondition: "notOver",
            });
          }
        );

        if (locStRt.page.activeMode1 === "receipt") {
          lsMethods.modeSwitch({ keyStr: "item" });
        } else if (sessionMRV.returnItems.length === 0) {
          setPageLS({ activeError1: pageLocSt.oErrorObjects["noItems"] });
        } else if (!allValid) {
          setPageLS({
            activeError1: pageLocSt.oErrorObjects["invalidReturnReasons"],
          });
        } else if (!allReceipted) {
        } else {
          resetPageLS({ activeErrorALL: true });
          resetAllEntry30LS({ activeErrorALL: true });
          resetReasonPickerLS({ activeErrorALL: true });
          nodeNav("newitems");
        }
      },

      resetForm: () => {
        resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
        resetPageLS({ activeErrorALL: true });
        resetReasonPickerLS({ activeErrorALL: true });
      },

      resetKeysToo: () => {
        resetAllEntry30LS({ activeErrorALL: true });
        console.log("Ya Clear Keys Too");
        resetPageLS({ activeErrorALL: true, activeKey1: true });
        resetReasonPickerLS({ activeErrorALL: true, activeKey1: true });
      },

      modeSwitch: ({ keyStr = "receipt" }) => {
        setPageLS({ activeMode1: keyStr });
        resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
        resetPageLS({ activeErrorALL: true });
      },

      setPageError: ({ errorKeyStr = "" }) => {
        setPageLS({ activeError1: pageLocSt.oErrorObjects[errorKeyStr] });
      },
    };

    return lsMethods;
  };

  outMethods.AddItemsAndInvos = AddItemsAndInvos;

  const NewItems = () => {
    const resetNewItemEntryLS = useResetLocStFields("NewItemEntrySTRX");

    const mNewItemsHooks = {
      basicClear: () => {
        console.log("Set New Items");
        resetPageLS({
          activeErrorALL: true,
          activeUI3: true,
          activeKey1: true,
          activeData1: true,
        });
        resetNewItemEntryLS({ activeErrorALL: true });
      },

      handleItemQtyChange: (e, itemAtom) => {
        const newQty = e.target.value;

        setSessionItems({
          itemsArrRouteStr: "newItems",
          itemAtom: itemAtom,
          newQty: newQty,
          actionType: "edit",
        });
      },

      itemExchStatus: (itemAtom) => {
        // eventually this will use the atomizedNewItems array.
        const outObj = {};

        const returnItemQty =
          findAtom({
            itemNum: itemAtom.atomItemNum,
            itemsArr: sessionMRV.returnItems,
            asIndex: false,
          }).atomItemQty || 0;
        outObj.returnItemQty = returnItemQty;

        const tileQty = itemAtom.atomItemQty;

        outObj.qtyStatus =
          returnItemQty === tileQty
            ? "valid"
            : !returnItemQty
            ? "noReturn"
            : "mismatchQty";

        return outObj;
      },

      continue: () => {
        console.log("No Continue Set");
      },
    };

    return mNewItemsHooks;
  };
  outMethods.NewItems = NewItems;

  //-------------------------------------

  return outMethods;
}

export { useLocStMethods_STRX };

/*
  
  
  
  */
