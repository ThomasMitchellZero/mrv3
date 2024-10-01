import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";
import { DescriptorIcon } from "../../../../../mrv/mrv-components/DisplayOutputs/IconComponents/DescriptorIcon";

import { centsToDollars, greenify } from "../../../../../mrv/MRVhooks/MRVhooks";

function ItemReceiptRow({atomizedItem}) {
  // invoStatus will eventually include NRR Lifetime Warranty.
  const invoStatus = atomizedItem.atomInvoNum ? "receipted" : "needsReceipt";
  const moneyObj = atomizedItem.atomMoneyObj;
  const unitBaseValue = moneyObj.unitBaseValue;
  const itemQty = atomizedItem.atomItemQty;
  const totalValue = unitBaseValue * itemQty;

  const oConfigs = {
    receipted: {
      invoStr: `#${atomizedItem.atomInvoNum}`,
      invoColor: "color__primary__text",
      color: greenify(unitBaseValue),
      iconStr: "receiptLong",
      unitVal: `$${centsToDollars(unitBaseValue)}`,
      totalVal: `$${centsToDollars(totalValue)}`,
    },
    needsReceipt: {
      invoStr: "No Receipt",
      invoColor: "color__red__text",
      color: "color__red__text",
      iconStr: "alert",
      unitVal: "- -",
      totalVal: "- -",
    },
  };

  const config = oConfigs[invoStatus];

  // style does not appear to be populating correctly but this is a lousy use of my time.

  const iconStyle = {
    iconStr: config.iconStr,
    ctnrSize: "1.5rem",
    fontSize: "1rem",
    color: config.invoColor,
    backgroundcolor: "red",
  };

  // greenify neg. values because they are stored as positive in the invoices.
  return (
    <div key={`${atomizedItem.atomItemNum}row`} className={`invoInfoRow`}>
      <div className={`body__small field receiptCol`}>
        <div className={`receiptNum body color__primary__text`}>
          <DescriptorIcon {...iconStyle} />
          <p className={`truncate ${config.invoColor}`}>{`${config.invoStr}`}</p>
        </div>

        <div className={`qty_x body color__primary__text`}>
          {`${itemQty}`}
          <p>x</p>
        </div>
      </div>

      <div className={`unitPriceCol field body alignRight ${config.color}`}>
        {config.unitVal}
        <div className={`tinyText color__secondary__text`}>ea.</div>
      </div>
      <div
        className={`totalPriceCol field alignRight body bold ${config.color}`}
      >
        {config.totalVal}
      </div>
    </div>
  );
}

export { ItemReceiptRow };
