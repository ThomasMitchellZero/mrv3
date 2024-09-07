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
  useFindAtom,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

function useLocStMethods_STRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSession = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const pageLocSt = locStRt.page;

  const findAtom = useFindAtom();
  const lsUniversal = useCompHooks_MRV().universal;
  const setPageError = ({ errorKeyStr }) =>
    lsUniversal.setError({ errorKeyStr: errorKeyStr, lsRtKey: "page" });

  const outMethods = {};

  const resetPageLS = useResetLocStFields("page");

  // Shared Methods -------------------------------------

  const AddItemsAndInvos = () => {
    const resetAllEntry30LS = useResetLocStFields("AllEntry30");
    const resetReasonPickerLS = useResetLocStFields("ReasonPickerSC");
    const mrvMethods = useCompHooks_MRV().oReasonPicker_SC;

    const lsMethods = {
      basicClear: () => {
        console.log("Ya Basic");
        resetPageLS({ activeErrorALL: true });
        resetAllEntry30LS({ activeErrorALL: true });
      },

      continue: () => {
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
          setSession((draft) => {
            draft.locSt.page.activeError1 = pageLocSt.oErrorObjects["noItems"];
          });
        } else if (!allValid) {
          setSession((draft) => {
            draft.locSt.page.activeError1 =
              pageLocSt.oErrorObjects["invalidReturnReasons"];
          });
        } else {
          console.log("Deeper, Daddy");
          resetPageLS({ activeErrorALL: true });
          resetAllEntry30LS({ activeErrorALL: true });
          resetReasonPickerLS({ activeErrorALL: true });
        }
        //nodeNav("reason");
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
        setSession((draft) => {
          draft.locSt.page.activeMode1 = keyStr;
        });
        resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
        resetPageLS({ activeErrorALL: true });
      },

      setPageError: ({ errorKeyStr = "" }) => {
        setSession((draft) => {
          draft.locSt.page.activeError1 =
            draft.locSt.page.oErrorObjects[errorKeyStr];
        });
      },
    };

    return lsMethods;
  };

  outMethods.AddItemsAndInvos = AddItemsAndInvos();

  //-------------------------------------

  return outMethods;
}

export { useLocStMethods_STRX };

/*
  
  
  
  */
