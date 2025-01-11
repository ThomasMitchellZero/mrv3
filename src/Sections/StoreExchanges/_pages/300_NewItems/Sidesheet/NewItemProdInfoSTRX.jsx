import { Sidesheet_Base_MRV } from "../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";
import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";
import { MessageRibbonMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

import {
  useSetLocStFields,
  useResetLocStFields,
  useSetSessionItems,
} from "../../../../../mrv/MRVhooks/MRVhooks";

import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";

import { useOutletContext } from "react-router-dom";

function NewItemProdInfoSTRX() {
  const resetPageLS = useResetLocStFields("page");
  const lsMethods = useLocStMethods_STRX().NewItems();

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const pageLSrt = sessionMRV.locSt.page;
  const activeItemKey = pageLSrt.activeKey1;
  const activeItemData = pageLSrt.activeData1;
  const itemExchStatus = lsMethods.itemExchStatus(activeItemData).qtyStatus;
  console.log(lsMethods.itemExchStatus(activeItemData));

  // reads status evaluated by itemExchStatus()
  const oRibbonConfig = {
    valid: {
      message: `Return Item quantity matches New Item quantity.`,
      type: `success`,
    },
    noReturn: {
      message: `This New Item does not match any Return Item in the cart.`,
      type: `critical`,
    },
    mismatchQty: {
      message: `Returned item quantity does not match New Item quantity.  Any unmatched items will be removed.`,
      type: `alert`,
    },
  };

  const uiItemDetails = activeItemData ? (
    <div className={`vBox minFlex`}>
      <MRVitemDetails
        showPrice={false}
        showQty={false}
        thisItemAtom={activeItemData}
      ></MRVitemDetails>
      <div className={`hBox`}>
        <MRVinput width={"8rem"}>
          <input
            type="number"
            value={activeItemData?.atomItemQty}
            onChange={(e) => {
              lsMethods.handleItemQtyChange(e, activeItemData);
            }}
          />
        </MRVinput>
      </div>
      <MessageRibbonMRV
        message={oRibbonConfig[itemExchStatus].message}
        type={oRibbonConfig[itemExchStatus].type}
      />
    </div>
  ) : null;

  return (
    <Sidesheet_Base_MRV
      btnIcon={`close`}
      title={`New Item Details`}
      fNavBtnClick={() => {
        lsMethods.basicClear();
      }}
    >
      {uiItemDetails}
    </Sidesheet_Base_MRV>
  );
}

export { NewItemProdInfoSTRX };
