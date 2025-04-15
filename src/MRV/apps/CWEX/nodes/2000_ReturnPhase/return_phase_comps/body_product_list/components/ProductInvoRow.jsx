import { dProduct } from "../../../../../../../mrv_data_types";
import { IconMRV } from "../../../../../../../components/ui/icon/IconMRV";
import { centsToDollars } from "../../../../../../../mrv_controller";

function ProductInvoRow({ oProduct }) {
  const refProduct = dProduct({});
  const oConfigs = {
    hasReceipt: {
      sLabel: `${oProduct.sInvoNum}`,
      sIcon: "receiptLong",
      sUnitCost: `$${centsToDollars(oProduct.iUnitBaseValue)}`,
    },
    noReceipt: {
      sLabel: "No Receipt",
      sIcon: "alert",
      sUnitCost: "- -",
    },
  };
  const config = oProduct.sInvoNum ? oConfigs.hasReceipt : oConfigs.noReceipt;

  return (
    <div className={`hBox width__max flex__min gap__0rem`}>
      <div className={`cell rcptNumCol`}>
        <IconMRV
          sIconKey={config.sIcon}
          ctnrSize="1.25rem"
          fontSize="1.25rem"
        />
        {config.sLabel}
      </div>
      <div className={`cell rcptQtyCol`}>{`${oProduct.iQty} x`}</div>
      <div className={`cell rcptValueCol`}>{config.sUnitCost}</div>
    </div>
  );
}

export { ProductInvoRow };
