import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { BigLabeledValue } from "../../../../../mrv/mrv-components/DisplayOutputs/BigLabeledValue";

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
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locMethods = useLocStMethods_STRX().NewItems();

  const returnItemQty = findAtom({
    itemNum: itemAtom.atomItemNum,
    itemsArr: sessionMRV.returnItems,
    asIndex: false,
  }).atomItemQty;

  return (
    <div className={`tile tileSpan`}>
      <div className={`col itemSpan`}>
        <MRVitemDetails thisItemAtom={itemAtom} />
      </div>
      <div className={`col tileInfoSpan`}>
        <div className={`col rtrnSpan centerAll`}>
          <BigLabeledValue
            labelStr={`Qty Returned`}
            valueStr={returnItemQty}
            size={`M`}
            status={`neutralGrey`}
          />
        </div>
        <div className={`col qtySpan`}></div>
        <div className={`col iconSpan`}></div>
      </div>
    </div>
  );
}

export { NewItemsTileSTRX };
