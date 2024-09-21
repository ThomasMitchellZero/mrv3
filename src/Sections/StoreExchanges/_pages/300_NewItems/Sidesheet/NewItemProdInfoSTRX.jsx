import { Sidesheet_Base_MRV } from "../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

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

  const resetPageLS = useResetLocStFields("page");

  return (
    <Sidesheet_Base_MRV
      btnIcon={`close`}
      title={`New Item Details`}
      fNavBtnClick={() => {
        lsMethods.basicClear();
      }}
    ></Sidesheet_Base_MRV>
  );
}

export { NewItemProdInfoSTRX };
