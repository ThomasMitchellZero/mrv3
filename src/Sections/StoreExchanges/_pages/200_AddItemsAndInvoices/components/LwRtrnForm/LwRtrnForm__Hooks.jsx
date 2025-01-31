import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
  makeLocStFields,
  errorObj,
} from "../../../../../../globalFunctions/globalJS_classes";

import {
  useResetLocStFields,
  useSetLocStFields,
  useFindAtom,
  useNodeNav,
} from "../../../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

// base local state
const LwRtrnForm__LS = makeLocStFields({
  _keyStr: "LwRtrnForm",
  oErrorObjects: {
    invalidItemNum: new errorObj({
      key: "invalidItemNum",
      str: "Invalid Item Number",
    }),
    invalidQty: new errorObj({
      key: "invalidQty",
      str: "Return Qty must match Replacement Qty",
    }),
  },
});

// Hooks
function useLwRtrnForm__Hooks() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  // LS stuff
  const locStRt = sessionMRV.locSt.LwRtrnForm;
  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");
  const setLwRtrnFormLS = useSetLocStFields("LwRtrnForm");
  const resetLwRtrnFormLS = useResetLocStFields("LwRtrnForm");

  // Right now, I'm not using any of this.

  const closeLwRtrnForm = () => {
    // LwRtrnForm is going away, so reset its LS and clear ActiveOverlay1 from page.
    console.log("Closing LwRtrnForm");
    resetLwRtrnFormLS({ EVERYONE: true });
    resetPageLS({ activeOverlay1: true });
  };

  return {
    closeLwRtrnForm,
  };
}

export { useLwRtrnForm__Hooks, LwRtrnForm__LS };
