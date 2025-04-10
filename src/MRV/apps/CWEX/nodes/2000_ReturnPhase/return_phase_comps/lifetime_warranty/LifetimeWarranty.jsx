import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { dLocalCtx } from "../../../../../../mrv_data_types";

import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";

function LifetimeWarranty({ oPage }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const pageLS = oPage.oLocalState;
  const setPageLS = oPage.fSetLocalState;
  const resets = oPage.oResets;

  const LW_LS = dLocalCtx({
    oInitLS: {
      sBrand: "",
      sElectric: "",
      iExchQty: 0,
      sItemKey: "",
    },
  });

  const handleClose = (e) => {
    e.stopPropagation();
    // clear the active overlay
    setPageLS({ ...pageLS, ...resets.overlay });
  };

  return (
    <div
      onClick={handleClose}
      className={`hBox lifetime_warranty scrimOverlay justify__end align__end `}
    >
      <SidesheetMRV
        sNavBtn="close"
        sTitle="Unlisted Warranty Item"
      ></SidesheetMRV>
    </div>
  );
}

export { LifetimeWarranty };
