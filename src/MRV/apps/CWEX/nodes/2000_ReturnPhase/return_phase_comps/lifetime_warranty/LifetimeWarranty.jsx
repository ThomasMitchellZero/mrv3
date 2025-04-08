import { useOutletContext } from "react-router-dom";
import { cloneDeep } from "lodash";
import { dPage } from "../../../../../../mrv_data_types";

function LifetimeWarranty({ oPage }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const pageLS = oPage.oPageLS;
  const setPageLS = oPage.fSetPageLS;
  const resets = oPage.oResets;

  const handleClear = (e) => {
    e.stopPropagation();
    // clear the active overlay
    setPageLS({ ...pageLS, ...resets.overlay });
  };

  return (
    <div
      onClick={handleClear}
      className={`lifetime_warranty scrimOverlay`}
    ></div>
  );
}

export { LifetimeWarranty };
