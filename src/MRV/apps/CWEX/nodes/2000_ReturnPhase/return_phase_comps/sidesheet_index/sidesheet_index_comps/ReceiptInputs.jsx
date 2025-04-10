import { cloneDeep } from "lodash";
import { SaleRecordsAPI } from "../../../../../../../../local_APIs/sale_records";
import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  baseStateExTurns,
  oBaseLocState,
} from "../../../../../../../mrv_data_types";

function ReceiptInputs({ oPage }) {
  const pageLS = oPage.oLocalState;
  const fSetPageLS = oPage.fSetLocalState;

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const oReceiptsAPI = useContext(SaleRecordsAPI);

  const oInitThisLS = {
    sReceiptKey: "",
  };

  const [thisLS, setThisLS] = useState(oInitThisLS);

  // Receipt Num Input //////////////////////////////////////////////////
  const handleReceiptInput = (e) => {
    const draft = cloneDeep(thisLS);
    draft.sReceiptKey = e.target.value;
    setThisLS(draft);
  };

  // Submit //////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    const refLS = oBaseLocState;
    const sInvoNum = thisLS.sReceiptKey;
    const sInvoKey = `_${sInvoNum}`; // session keys have "_" prefix to coerce them to strings.

    // Check for duplicate receipt
    const bDuplicateInvo = sInvoKey in sessionMRV.sessionInvos;
    if (bDuplicateInvo) {
      const draftPage = cloneDeep(pageLS);
      draftPage.sActiveError = "duplicateReceipt";
      fSetPageLS(draftPage);
      return;
    }

    // Check for invalid receipt
    const bInvalidInvo = !(sInvoNum in oReceiptsAPI);
    if (bInvalidInvo) {
      const draftPage = cloneDeep(pageLS);
      draftPage.sActiveError = "invalidReceipt";
      fSetPageLS(draftPage);
      return;
    }

    // If all validity checks pass, add the receipt to the session
    const draftMRV = cloneDeep(sessionMRV);
    draftMRV.sessionInvos[sInvoKey] = sInvoNum;
    setSessionMRV(draftMRV);
    setThisLS(oInitThisLS);
  };

  // Error UI //////////////////////////////////////////////////
  const sError = pageLS.sActiveError;
  const bInvoiceError =
    sError === "invalidReceipt" || sError === "duplicateReceipt";
  const uiError = bInvoiceError ? (
    <p className={`warning width__max text__align__right`}>
      {oPage.oErrorObjects[pageLS.sActiveError].sMessage}
    </p>
  ) : null;

  return (
    <form
      id="rtrnReceiptInput"
      className={`vBox receiptInput gap__1rem width__max flex__min`}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Receipt Number"
        className={`width__max ${bInvoiceError ? "error" : ""}`}
        onChange={(e) => handleReceiptInput(e)}
        value={thisLS.sReceiptKey}
      />
      {/* These are dummies that don't change the LS */}
      <div className={`hBox gap__1rem`}>
        <input placeholder="Store #" className={`storeNum`} />
        <input type="date" className={`date`} />
      </div>
      <div className={`hBox gap__1rem justify__end width__max`}>
        <button form="rtrnReceiptInput" type="submit" className={`secondary `}>
          Add Receipt
        </button>
      </div>
      {uiError}
    </form>
  );
}

export { ReceiptInputs };
