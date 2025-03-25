import { ScanScreen } from "../../../../../../components/ui/scan_screen/ScanScreen";

function ReceiptsList({}) {
  const uiReceipts = [];

  const uiBody = uiReceipts.length ? (
    uiReceipts
  ) : (
    <ScanScreen mainTitle="Scan or enter Receipts" sIconKey="receiptLong" />
  );
  return <main className={`body`}>{uiBody}</main>;
}

export { ReceiptsList };
