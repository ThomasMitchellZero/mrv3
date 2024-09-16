import { NewItemsTileSTRX } from "./NewItemsTileSTRX";
import { DeleteCardColMRV } from "../../../../../mrv/mrv-components/inputs/DeleteCardColMRV";

import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useContext } from "react";
import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";

import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";

import {
  useSetLocStFields,
  useResetLocStFields,
  useSetSessionItems,
} from "../../../../../mrv/MRVhooks/MRVhooks";

function NewItemCardSTRX({ itemAtom = new returnAtom({}) }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locMethods = useLocStMethods_STRX().NewItems();

  return (
    <div className={`spanCtnr cardStyle`}>
      <NewItemsTileSTRX key={itemAtom.atomItemNum} itemAtom={itemAtom} />
      <div className={`col deleteSpan`}>
        <DeleteCardColMRV />
      </div>
    </div>
  );
}

export { NewItemCardSTRX };
