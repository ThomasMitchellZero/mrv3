import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { MessageRibbonMRV } from "../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

import { useLocStMethods_STRX } from "../../_resources/components/CompHooks_STRX";
import { useOutletContext } from "react-router";
import { useContext } from "react";

import { cloneDeep, isEmpty } from "lodash";

import {
  returnAtom,
  locStFields,
  clearedInputs,
  errorObj,
  clearedErrors,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useSetSessionItems,
} from "../../../../mrv/MRVhooks/MRVhooks";

import InvoContext from "../../../../store/invo-context";
import ProductContext from "../../../../store/product-context";

/* &&&&&&&&&&&&&&   Item Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const ItemEntry_SC_STRX = ({}) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const locStRt = sessionMRV.locSt.AllEntry30;
  const locMethods = useLocStMethods_STRX().AddItemsAndInvos;

  const setSessionItems = useSetSessionItems();
  const productCtx = useContext(ProductContext);
  const invoCtx = useContext(InvoContext);

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
      setSessionMRV((draft) => {
        draft.locSt.AllEntry30.activeError1 = formError;
      });
    } else {
      const outAtom = new returnAtom({
        atomItemNum: locStRt.input1,
        atomItemQty: locStRt.input2, // is this needed?
      });

      setSessionItems({
        itemAtom: outAtom,
        newQty: locStRt.input2,
        actionType: "add",
        itemsArrRouteStr: "returnItems",
      });

      locMethods.resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
    }
  };

  return (
    <form
      id={"addItemForm"}
      onSubmit={handleAddItem}
      className={`inputSection`}
    >
      <MRVinput
        flex={"1 1 0rem"}
        width={`100%`}
        hasError={activeErrorStr === locStRt.oErrorObjects.invalidItem.str}
      >
        <input
          type="text"
          value={locStRt.input1}
          placeholder="Item Number"
          onChange={(event) => {
            const itemNumField = event.target.value;
            setSessionMRV((draft) => {
              draft.locSt.AllEntry30.input1 = itemNumField;
            });
          }}
        />
      </MRVinput>

      <div className={`inputRow`}>
        <MRVinput
          width={"8rem"}
          hasError={activeErrorStr === locStRt.oErrorObjects.invalidQty.str}
        >
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Qty"
            value={locStRt.input2}
            onChange={(event) => {
              const inputQty = parseInt(event.target.value) || "";
              setSessionMRV((draft) => {
                draft.locSt.AllEntry30.input2 = inputQty;
              });
            }}
          />
        </MRVinput>
        <div className={`hBox maxFlex`} />
        <button form="addItemForm" type="submit" className={`secondary`}>
          Add Item
        </button>
      </div>
      <p className={`warning`}>{activeErrorStr}</p>
    </form>
  );
};

export { ItemEntry_SC_STRX };
