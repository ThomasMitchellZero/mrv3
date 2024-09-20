import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { BigLabeledValue } from "../../../../../mrv/mrv-components/DisplayOutputs/BigLabeledValue";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";

import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useContext } from "react";
import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";

import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";
import {
  useSetLocStFields,
  useResetLocStFields,
  useSetSessionItems,
  useFindAtom,
} from "../../../../../mrv/MRVhooks/MRVhooks";

function NewItemsTileSTRX({ itemAtom = new returnAtom({}) }) {
  const findAtom = useFindAtom();
  const mrvCtx = useOutletContext();
  const setSessionItems = useSetSessionItems();
  const locMethods = useLocStMethods_STRX().NewItems();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const newItems = sessionMRV.newItems;
  const atomizedNewItems = sessionMRV.atomizedNewItems;

  const returnItemQty = findAtom({
    itemNum: itemAtom.atomItemNum,
    itemsArr: sessionMRV.returnItems,
    asIndex: false,
  }).atomItemQty;

  const tileQty = itemAtom.atomItemQty;
  const qtyStatus = !returnItemQty
    ? "noReturn"
    : returnItemQty === tileQty
    ? "valid"
    : "incomplete";

  // shared functions

  const thisTileAtoms = atomizedNewItems.filter(
    (atom) => atom.atomItemNum === itemAtom.atomItemNum
  );

  const handleItemQtyChange = (e) => {
    const newQty = e.target.value;

    setSessionItems({
      itemsArrRouteStr: "newItems",
      itemAtom: itemAtom,
      newQty: newQty,
      actionType: "edit",
    });
  };

  // This complexity isn't needed yet, but it will be once we handle more transaction types.
  const transTypeFilter = (transType) => {
    return thisTileAtoms.filter((atom) => atom.atomTransType === transType);
  };
  const transTypeQty = (transTypeArr) => {
    let outQty = 0;
    outQty = transTypeArr.reduce((acc, curr) => {
      return acc + curr.atomItemQty;
    }, 0);
    return outQty;
  };

  const oConfigs = {};

  const mvpConfigs = {
    noReturn: {
      returnQty: "None",
      status: "badRed",
    },
    valid: {
      returnQty: returnItemQty,
      status: "defaultBlack",
    },
    incomplete: {
      returnQty: returnItemQty,
      status: "defaultBlack",
    },
  };

  // Backup in case we are mega-crunched pre-demo and we need to get this working.

  return (
    <div className={`tile tileSpan`}>
      <div className={`col itemSpan`}>
        <MRVitemDetails
          showPrice={false}
          showQty={false}
          thisItemAtom={itemAtom}
          twoLineDescription={true}
        />
      </div>
      <div className={`col tileInfoSpan`}>
        <div className={`col rtrnSpan centerAll`}>
          <BigLabeledValue
            labelStr={`Qty Returned`}
            valueStr={returnItemQty || 0}
            size={`M`}
            status={`${mvpConfigs[qtyStatus].status}`}
            valueHeight="4rem"
          />
        </div>
        <div className={`col qtySpan centerAll`}>
          <div className={`body__small minWidth color__primary__text`}>New Item Qty</div>
          <MRVinput>
            <input
              type={`number`}
              value={tileQty}
              onChange={(e) => {
                handleItemQtyChange(e);
              }}
            />
          </MRVinput>
        </div>
        <div className={`col iconSpan`}></div>
      </div>
    </div>
  );
}

export { NewItemsTileSTRX };
