import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useContext } from "react";
import { useLocStMethods_STRX } from "../../_resources/components/CompHooks_STRX";
import { mrvItemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";
import {
  useSetLocStFields,
  useResetLocStFields,
  useSetSessionItems,
} from "../../../../../mrv/MRVhooks/MRVhooks";

function NewItemsTileSTRX({itemAtom = new returnAtom({})}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locMethods = useLocStMethods_STRX().NewItems();

  return (
    <div className={`tile cols`}>
      <div className={`itemCol`}>
        <mrvItemDetails itemAtom={itemAtom} />
      </div>
      <div className={`rtrnCol`}></div>
      <div className={`qtyCol`}></div>
      <div className={`iconCol`}></div>
    </div>
  );
}

export default NewItemsTileSTRX;
