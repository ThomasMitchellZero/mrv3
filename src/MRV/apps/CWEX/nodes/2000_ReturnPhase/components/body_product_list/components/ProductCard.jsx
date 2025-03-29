import { cloneDeep, set } from "lodash";
import { useOutletContext } from "react-router-dom";

import { CardSummaryCol } from "../../../../../../../components/ui/card_summary_col/CardSummaryCol";

function ProductCard({ oPage, oProduct, children }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const returnItems = sessionMRV.returnItems;

  const fSetPageLS = oPage.fSetPageLS;
  const oResets = oPage.oResets;

  const fHandeClick = (e) => {
    const pageLS = oPage.oPageLS;
    e.stopPropagation();
    const draftPage = { ...cloneDeep(pageLS), ...oResets.errorOnly };
    fSetPageLS(draftPage);
  };

  const fHandleClear = (e) => {
    e.stopPropagation();
    const pageLS = oPage.oPageLS;
    const draftPage = { ...cloneDeep(pageLS), ...oResets.errorOnly };
    fSetPageLS(draftPage);

    const draftSession = cloneDeep(sessionMRV);
    delete draftSession.returnItems[oProduct.sKey];
    setSessionMRV(draftSession);
  };

  return (
    <div
      onClick={(e) => {
        fHandeClick(e);
      }}
      className={`prodCard floorplan card`}
    >
      {children}
      <CardSummaryCol fHandleClose={fHandleClear} />
    </div>
  );
}

export { ProductCard };
