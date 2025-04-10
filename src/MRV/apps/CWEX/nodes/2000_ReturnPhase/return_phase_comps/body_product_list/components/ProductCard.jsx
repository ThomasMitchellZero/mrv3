import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router-dom";
import { dLocalCtx } from "../../../../../../../mrv_data_types";

import { CardSummaryCol } from "../../../../../../../components/ui/card_summary_col/CardSummaryCol";

function ProductCard({ oPage, oProduct, children }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const returnItems = sessionMRV.returnItems;
  const refLocalCtx = dLocalCtx({});

  const fSetPageLS = oPage.fSetLocalState;
  const oResets = oPage.oResets;
  const oPageLS = oPage.oLocalState;

  const fHandleClick = (e) => {
    e.stopPropagation();
    const draftPage = { ...cloneDeep(oPageLS), ...oResets.errorOnly };
    fSetPageLS(draftPage);
  };

  const fHandleClear = (e) => {
    e.stopPropagation();
    const draftPage = { ...cloneDeep(oPageLS), ...oResets.errorOnly };
    fSetPageLS(draftPage);

    const draftSession = cloneDeep(sessionMRV);
    delete draftSession.returnItems[oProduct.sKey];
    setSessionMRV(draftSession);
  };

  return (
    <div
      onClick={(e) => {
        fHandleClick(e);
      }}
      className={`prodCard floorplan card`}
    >
      {children}
      <CardSummaryCol fHandleClose={fHandleClear} />
    </div>
  );
}

export { ProductCard };
