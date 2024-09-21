import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";
import { ReasonBadgeSTRX } from "../../../_resources/components/CompConfigsSTRX";
import { ItemReceiptRow } from "./ItemReceiptRow";
import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";
import { useCompHooks_MRV } from "../../../../../mrv/mrv-components/CompHooksMRV";
import {
  centsToDollars,
  atomsMonetizer,
  centStringifier,
  useSetSessionItems,
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../mrv/MRVhooks/MRVhooks";

import { greenify } from "../../../../../mrv/MRVhooks/MRVhooks";
import { DeleteCardColMRV } from "../../../../../mrv/mrv-components/inputs/DeleteCardColMRV";
import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";

const RtrnItemsMainCard = ({ returnItemAtom }) => {
  const mrvCtx = useOutletContext();
  const resetReasonPickerLS = useResetLocStFields("ReasonPickerSC");
  const setPageLS = useSetLocStFields("page");
  const resetPageLS = useResetLocStFields("page");
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const setSessionItems = useSetSessionItems();

  const locMethods = useLocStMethods_STRX().AddItemsAndInvos();

  const aReturnItems = sessionMRV.returnItems;
  const aAtomizedItems = sessionMRV.atomizedReturnItems;

  const childrenOfMainItem = aReturnItems.filter((thisAtom) => {
    return thisAtom.parentKey === returnItemAtom.atomItemNum;
  });

  const aMainPlusChildren = [returnItemAtom, ...childrenOfMainItem];

  const aAtomsOfCard = aAtomizedItems.filter((thisSubAtom) => {
    return (
      thisSubAtom.atomItemNum === returnItemAtom.atomItemNum ||
      thisSubAtom.atomItemNum === returnItemAtom.parentKey
    );
  });

  const cardTotalVal = atomsMonetizer(aAtomsOfCard).unitTotal;
  const cardBaseValue = cardTotalVal.unitBaseValue;

  const cardString = centStringifier({
    valueInCents: cardTotalVal,
  });

  // local function for handling qty changes.
  const handleQtyChange = (e, atomizedItem) => {
    const newQty = e.target.value;
    setSessionItems({
      itemsArrRouteStr: "returnItems",
      itemAtom: atomizedItem,
      newQty: newQty,
      actionType: "edit",
    });
  };

  ///////////////////////////////////////////////////////////////////
  //                     Tile for an item.
  ///////////////////////////////////////////////////////////////////

  const uiItemTile = (tileItemAtom) => {
    const refAtom = new returnAtom({});

    const handleClick = (event) => {
      event.stopPropagation();
      console.log("tileItemAtom", tileItemAtom);
      setPageLS({ activeKey1: tileItemAtom.atomItemNum });
      /*
            setSessionMRV((draft) => {
        draft.locSt.page.activeKey1 = tileItemAtom.atomItemNum;
      });
      */

      resetReasonPickerLS({ EVERYONE: true });
    };

    const activeClass =
      tileItemAtom.atomItemNum === sessionMRV.locSt.page.activeKey1
        ? "selected"
        : "";

    const aInfoRows = aAtomizedItems.filter((thisSubAtom) => {
      return thisSubAtom.atomItemNum === tileItemAtom.atomItemNum;
    });

    const aInfoRowsUI = aInfoRows.map((thisSubAtom) => {
      return (
        <ItemReceiptRow
          key={thisSubAtom.primaryKey}
          atomizedItem={thisSubAtom}
        />
      );
    });

    return (
      <div
        key={`${tileItemAtom.primaryKey}tile`}
        className={`itemRow subCardStyle ${activeClass}`}
        onClick={(e) => handleClick(e)}
      >
        <div className={"rowCol detailCol"}>
          <MRVitemDetails
            showPrice={false}
            showQty={false}
            thisItemAtom={tileItemAtom}
          />
        </div>
        <div className={"rowCol totalQtyCol"}>
          <MRVinput>
            <input
              type="number"
              value={tileItemAtom.atomItemQty}
              onChange={(event) => {
                handleQtyChange(event, tileItemAtom);
              }}
            />
          </MRVinput>
          <ReasonBadgeSTRX itemAtom={tileItemAtom} />
        </div>
        <div className={`invoInfoColumn`}>{aInfoRowsUI}</div>
      </div>
    );
  };

  ///////////////////////////////////////////////////////////////////
  //                 Card for the item and its children
  ///////////////////////////////////////////////////////////////////

  const aCardTiles = aMainPlusChildren.map((thisAtom) => {
    return uiItemTile(thisAtom);
  });

  const handleClearItem = (e) => {
    e.stopPropagation();
    console.log("trying to delete Return Item");
    locMethods.resetKeysToo(); // need to clear the active item.
    setSessionItems({
      itemAtom: returnItemAtom,
      actionType: "remove",
    });
  };

  // final UI output

  return (
    <div
      key={`${returnItemAtom.atomItemNum}card`}
      className={`cardStyle entryCard items_grid`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={"itemSubcardColumn field"}>{aCardTiles}</div>

      <div className={`trashCol field`}>
        <DeleteCardColMRV
          bigValue={cardString}
          description={"Refund Value"}
          greenifyVal={cardTotalVal}
          handleClick={
            handleClearItem
          }
        />
      </div>
    </div>
  );
};

export { RtrnItemsMainCard };
