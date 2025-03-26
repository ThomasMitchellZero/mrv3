import { ScanScreen } from "../../../../../../components/ui/scan_screen/ScanScreen";
import { useOutletContext } from "react-router-dom";

import { ReceiptCard } from "./ReceiptCard";

function ReceiptsList({}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const sessionInvos = sessionMRV.sessionInvos;

  const uiReceipts = Object.keys(sessionInvos).map((sReceiptKey) => (
    <ReceiptCard sReceiptKey={sReceiptKey} key={sReceiptKey} />
  ));

  const uiBody = uiReceipts.length ? (
    uiReceipts
  ) : (
    <ScanScreen mainTitle="Scan or enter Receipts" sIconKey="receiptLong" />
  );
  return <main className={`body gap__1rem`}>{uiBody}</main>;
}

export { ReceiptsList };
