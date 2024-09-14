import { Sidesheet_Base_MRV } from "../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import {
  useSetLocStFields,
  useResetLocStFields,
} from "../../../../../mrv/MRVhooks/MRVhooks";

function ActionsSTRX() {
  const setPageLS = useSetLocStFields("page");
  const resetPageLS = useResetLocStFields("page");
  return (
    <Sidesheet_Base_MRV title="Actions">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPageLS({ activeUI3: "NewItemEntrySTRX" });
          resetPageLS({ activeErrorALL: true });
        }}
        className={`actionBtn secondary`}
      >
        <MdOutlineAddShoppingCart fontSize={`1.5rem`} />
        Add New Item
      </button>
    </Sidesheet_Base_MRV>
  );
}

export { ActionsSTRX };
