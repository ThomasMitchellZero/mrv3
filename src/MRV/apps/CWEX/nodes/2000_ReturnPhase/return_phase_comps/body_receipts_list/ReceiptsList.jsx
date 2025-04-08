import { ScanScreen } from "../../../../../../components/ui/scan_screen/ScanScreen";
import { useOutletContext } from "react-router-dom";

import { ReceiptCard } from "./ReceiptCard";

function ReceiptsList({ oPage }) {
  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const sessionInvos = sessionMRV.sessionInvos;

  const uiReceipts = Object.values(sessionInvos).map((thisReceiptNum) => (
    <ReceiptCard sReceiptNum={thisReceiptNum} key={thisReceiptNum} />
  ));

  const uiBody = uiReceipts.length ? (
    uiReceipts
  ) : (
    <ScanScreen mainTitle="Scan or enter Receipts" sIconKey="receiptLong" />
  );
  return <main className={`body gap__1rem`}>{uiBody}</main>;
}

export { ReceiptsList };
