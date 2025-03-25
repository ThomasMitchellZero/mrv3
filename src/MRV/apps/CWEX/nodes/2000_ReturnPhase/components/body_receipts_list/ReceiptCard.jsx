import { dSaleRecord } from "../../../../../../mrv_data_types";
import { useContext } from "react";
import { SaleRecordsAPI } from "../../../../../../../local_APIs/sale_records";

function ReceiptCard({ sReceiptKey }) {
  const oReceipt = useContext(SaleRecordsAPI)[sReceiptKey];

  const refReceipt = dSaleRecord(oReceipt);

  return (
    <div className={`receiptCard`}>
      <p className={`body__large color__primary__text`}>{oReceipt.sInvoNum}</p>
    </div>
  );
}

export { ReceiptCard };
