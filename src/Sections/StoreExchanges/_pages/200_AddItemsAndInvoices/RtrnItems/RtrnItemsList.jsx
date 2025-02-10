import { useOutletContext } from "react-router";
import { useSetSessionItems } from "../../../../../mrv/MRVhooks/MRVhooks";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";

import { RtrnItemCard } from "./RtrnItemCard";
import { DescriptorIcon } from "../../../../../mrv/mrv-components/DisplayOutputs/IconComponents/DescriptorIcon";

const RtrnItemsList = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;

  const aReturnItems = sessionMRV.returnItems;

  const noItems = aReturnItems.length === 0;

  const aMainItems = aReturnItems.filter((returnItem) => {
    return !returnItem.parentKey;
  });

  // blank screen for no items.
  const uiScanItems = (
    <ScanScreenMRV
      mainTitle="scan Or Enter Items Being returned"
      subtitle="Or press 'Receipts' tab to enter receipts"
      iconStr="box"
    />
  );

  const uiItemCardTitle = (
    <div className={`columnTitleRow items_grid`}>
      <div className={`columnTitle detailCol`}>Item</div>
      <div className={`columnTitle totalQtyCol`}>Qty Returned</div>
      <div className={`columnTitle receiptCol`}>
        <DescriptorIcon
          iconStr="receiptLong"
          ctnrSize="1.5rem"
          fontSize="1rem"
          backgroundColor=""
        />
        Item Receipts
      </div>
      <div className={`columnTitle rcptQtyCol`}>Qty</div>
      <div className={`columnTitle unitPriceCol`}>Unit Price</div>
      <div className={`columnTitle trashCol`}>Return Value</div>
    </div>
  );

  const uiCardArr = aMainItems.map((thisReturnItem) => {
    return (
      <RtrnItemCard
        key={thisReturnItem.atomItemNum}
        returnItemAtom={thisReturnItem}
      />
    );
  });

  // final UI output

  return noItems ? (
    uiScanItems
  ) : (
    <section className={`cardContainer itemsList`}>
      {uiItemCardTitle}
      {uiCardArr}
    </section>
  );
};

export { RtrnItemsList };
