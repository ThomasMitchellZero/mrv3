import { dSaleRecord } from "../../../../../../mrv_data_types";
import { useContext } from "react";
import { SaleRecordsAPI } from "../../../../../../../local_APIs/sale_records";

function ReceiptCard({ sReceiptNum }) {
  const oReceipt = useContext(SaleRecordsAPI)[sReceiptNum];

  const refReceipt = dSaleRecord(oReceipt);

  return (
    <div className={`receiptCard card width__max`}>
      <p className={`body__large color__primary__text`}>{oReceipt.sInvoNum}</p>
    </div>
  );
}

export { ReceiptCard };
