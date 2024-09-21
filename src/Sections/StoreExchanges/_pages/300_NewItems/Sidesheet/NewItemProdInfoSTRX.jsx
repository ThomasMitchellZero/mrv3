import { Sidesheet_Base_MRV } from "../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";
import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";

import {
  useSetLocStFields,
  useResetLocStFields,
  useSetSessionItems,
} from "../../../../../mrv/MRVhooks/MRVhooks";

import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";

import { useOutletContext } from "react-router-dom";

function NewItemProdInfoSTRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const lsMethods = useLocStMethods_STRX().NewItems();
  const pageLSrt = sessionMRV.locSt.page;
  const activeItemKey = pageLSrt.activeKey1;
  const activeItemData = pageLSrt.activeData1;

  const resetPageLS = useResetLocStFields("page");

  const uiItemDetails = activeItemData ? (
    <div className={`vBox minFlex`}>
      <MRVitemDetails
        showPrice={false}
        showQty={false}
        thisItemAtom={activeItemData}
      ></MRVitemDetails>
      <div className={`hBox`}>
        <MRVinput
        width={"8rem"}>
          <input
            type="number"
            value={activeItemData?.atomItemQty}
            onChange={(e) => {
              lsMethods.handleItemQtyChange(e, activeItemData);
            }}
          />
        </MRVinput>
      </div>
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
