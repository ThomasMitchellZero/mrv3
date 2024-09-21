import { NewItemsTileSTRX } from "./NewItemsTileSTRX";
import { DeleteCardColMRV } from "../../../../../mrv/mrv-components/inputs/DeleteCardColMRV";

import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useContext } from "react";
import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";

import {
  moneyObj,
  returnAtom,
} from "../../../../../globalFunctions/globalJS_classes";

import {
  useSetLocStFields,
  useResetLocStFields,
  useSetSessionItems,
  atomsMonetizer,
  centStringifier,
} from "../../../../../mrv/MRVhooks/MRVhooks";

function NewItemCardSTRX({ itemAtom = new returnAtom({}) }) {
  const mrvCtx = useOutletContext();
  const setSessionItems = useSetSessionItems();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locMethods = useLocStMethods_STRX().NewItems();

  const handleClearItem = () => {
    setSessionItems({
      itemsArrRouteStr: "newItems",
      actionType: "remove",
      itemAtom: itemAtom,
    });
  };

  const refReturnAtom = new returnAtom({});

  const aLikeAtoms = sessionMRV.atomizedNewItems.filter((atom) => {
    const isMatch =
      atom.atomItemNum === itemAtom.atomItemNum &&
      atom.transactionType === "likeExch";
    return isMatch;
  });

  // card may eventually contain more than 1 type of atom with children, discounts, etc.
  const aAllCardAtoms = [...aLikeAtoms];

  const refMoneyObj = new moneyObj({});
  const cardCashSumMO = atomsMonetizer(aAllCardAtoms);
  const cardCashSum = cardCashSumMO.unitTotal;

  return (
    <div className={`spanCtnr cardStyle`}>
      <NewItemsTileSTRX key={itemAtom.atomItemNum} itemAtom={itemAtom} />
      <div className={`col deleteSpan`}>
        <DeleteCardColMRV
          bigValue={centStringifier({
            valueInCents: cardCashSum,
            zeroAs0: false,
          })}
          description="New Item Cost"
          handleClick={handleClearItem}
        />
      </div>
    </div>
  );
}

export { NewItemCardSTRX };
