import { cloneDeep, find } from "lodash";
import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useResetLocStFields,
  useSetLocStFields,
  useFindAtom,
  useNodeNav,
  useSetSessionItems,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { cloneDeep } from "lodash";

import { useOutletContext } from "react-router";

function useNewItems__Hooks() {
  const mrvCtx = useOutletContext();
  const nodeNav = useNodeNav();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSession = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const pageLocSt = locStRt.page;

  //setSessionItems
  const setReturnItems = useSetSessionItems({
    targetStateArrKey: "returnItems",
  });
  const setNewItems = useSetSessionItems({ targetStateArrKey: "newItems" });

  const findAtom = useFindAtom();
  const outMethods = {};

  // Export Methods -------------------------------------

  const preloadNewItems = () => {
    // All logic to run prior to loading the NewItems page.

    const refAtom = new returnAtom();

    const outReturnItems = cloneDeep(sessionMRV.returnItems);
    const outNewItems = cloneDeep(sessionMRV.newItems);

    // First, create a list of all ReturnItems that automatically generate NewItems
    const aLWcustomItems = outReturnItems.filter((oItem) => {
      // All OoS LW items currently use the bifrostKey of "00100".  If that changes, change this condition.
      return oItem.bifrostKey === "00100";
    });

    // merge all categories of PreloadItems into a single array.  FttB, just aLWcustomItems.
    const aPreloadNewtems = [...aLWcustomItems];

    for (const i of aPreloadNewtems) {
      findAtom({
        itemNum: i.atomItemNum,
      });
      // remove all those NewItems.
    }
  };

  //-------------------------------------

  return outMethods;
}

export { useNewItems__Hooks };
