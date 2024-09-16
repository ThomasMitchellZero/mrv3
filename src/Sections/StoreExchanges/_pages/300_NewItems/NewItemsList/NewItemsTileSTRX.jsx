import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useContext } from "react";
import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";
import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";
import {
  useSetLocStFields,
  useResetLocStFields,
  useSetSessionItems,
} from "../../../../../mrv/MRVhooks/MRVhooks";

function NewItemsTileSTRX({ itemAtom = new returnAtom({}) }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locMethods = useLocStMethods_STRX().NewItems();

  return (
    <div className={`tile cols`}>
      <div className={`col itemCol`}>
        <MRVitemDetails thisItemAtom={itemAtom} />
      </div>
      <div className={`col rtrnCol`}></div>
      <div className={`col qtyCol`}></div>
      <div className={`col iconCol`}></div>
    </div>
  );
}

export { NewItemsTileSTRX };
