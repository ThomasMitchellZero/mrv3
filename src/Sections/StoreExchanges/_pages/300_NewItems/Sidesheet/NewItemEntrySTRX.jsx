import { Sidesheet_Base_MRV } from "../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";
import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";
import {
  useSetSessionItems,
  useSetLocStFields,
  useResetLocStFields,
} from "../../../../../mrv/MRVhooks/MRVhooks";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import ProductContext from "../../../../../store/product-context";
import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";

function NewItemEntrySTRX() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const setNewItemEntryLS = useSetLocStFields("NewItemEntrySTRX");
  const resetNewItemEntryLS = useResetLocStFields("NewItemEntrySTRX");
  const resetPageLS = useResetLocStFields("page");
  const locStRt = sessionMRV.locSt.NewItemEntrySTRX;
  const locMethods = useLocStMethods_STRX().NewItems();

  const setSessionItems = useSetSessionItems();
  const productCtx = useContext(ProductContext);

  const activeErrorStr = locStRt?.activeError1?.str || "";

  const errorInItemForm = () => {
    const itemNumInput = locStRt.input1;
    const itemQtyInput = locStRt.input2;
    const itemNumValid = itemNumInput in productCtx;
    const itemQtyValid = itemQtyInput > 0;

    let outFormError = !itemNumValid
      ? locStRt.oErrorObjects.invalidItem
      : !itemQtyValid
      ? locStRt.oErrorObjects.invalidQty
      : false;

    return outFormError;
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    const formError = errorInItemForm();

    if (formError) {
      setNewItemEntryLS({ activeError1: formError });
    } else {
      const outAtom = new returnAtom({
        atomItemNum: locStRt.input1,
        atomItemQty: locStRt.input2, // is this needed?
      });

      setSessionItems({
        itemAtom: outAtom,
        newQty: locStRt.input2,
        actionType: "add",
        itemsArrRouteStr: "newItems",
      });
      resetNewItemEntryLS({ inputALL: true, activeErrorALL: true });
    }
  };

  return (
    <Sidesheet_Base_MRV
      btnIcon={`back`}
      fNavBtnClick={() => {
        console.log("back button clicked from NewItemEntrySTRX");
        resetNewItemEntryLS({
          inputALL: true,
          activeErrorALL: true,
        });
        resetPageLS({ activeUI3: true });
      }}
      title="Add New Item"
    >
      <form
        id={`addNewItemForm`}
        className={`vBox minHeight gap2rem`}
        onSubmit={(e) => handleAddItem(e)}
      >
        <MRVinput width={`100%`}>
          <input
            placeholder="New Item #"
            type="text"
            value={locStRt.input1}
            onChange={(event) =>
              setNewItemEntryLS({ input1: event.target.value })
            }
          />
        </MRVinput>

        <div className={`hBox minFlex gap1rem`}>
          <MRVinput width={`8rem`}>
            <input
              placeholder="Item Qty"
              type="number"
              value={locStRt.input2}
              onChange={(event) =>
                setNewItemEntryLS({ input2: event.target.value })
              }
            />
          </MRVinput>
          <div className={`hbox maxFlex`}></div>
          <button form="addNewItemForm" type="submit" className={`secondary`}>
            Add Item
          </button>
        </div>
      </form>
    </Sidesheet_Base_MRV>
  );
}

export { NewItemEntrySTRX };
