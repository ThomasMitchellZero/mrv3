import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
  makeLocStFields,
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

  const closeLwRtrnForm = () => {
    // LwRtrnForm is going away, so reset its LS and clear ActiveOverlay1 from page.
    resetLwRtrnFormLS({ EVERYONE: true });
    resetPageLS({ activeOverlay1: true });
  };

  return {
    closeLwRtrnForm,
  };
}

export { useLwRtrnForm__Hooks, LwRtrnForm__LS };
