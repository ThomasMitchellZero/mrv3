import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { MessageRibbonMRV } from "../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

import { useAddItemsAndInvos_STRX } from "./C_AddItemsAndInvos_STRX";
import { useOutletContext } from "react-router";
import { useContext } from "react";

import { cloneDeep, isEmpty } from "lodash";

import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedInputs,
  errorObj,
  clearedErrors,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useSetSessionInvos,
  useSetSessionItems,
  useResetLocStFields,
} from "../../../../mrv/MRVhooks/MRVhooks";

import InvoContext from "../../../../store/invo-context";
import ProductContext from "../../../../store/product-context";


/* &&&&&&&&&&&&&&   Receipt Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const InvoEntry_SC_STRX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const parentRt = sessionMRV.locSt.AllEntry30;
  const locStRt = sessionMRV.locSt;
  const locMethods = useAddItemsAndInvos_STRX();

  const setSessionItems = useSetSessionItems();
  const setSessionInvosMRV = useSetSessionInvos();


  const noInvos = isEmpty(sessionMRV.sessionInvos);

  const invoCtx = useContext(InvoContext);

  const oErrors = {
    invalidReceipt: new errorObj({
      str: "Invalid Receipt Number",
    }),
    duplicateInvo: new errorObj({
      str: "Receipt Already Added",
    }),
  };

  const activeErrorStr = parentRt?.activeError1?.str || "";

  const errorInInvoForm = () => {
    const thisInvoNum = parentRt.input1;
    const invoNumValid = thisInvoNum in invoCtx;
    const invoAlreadyAdded = thisInvoNum in sessionMRV.sessionInvos;

    let outFormError = !invoNumValid
      ? oErrors.invalidReceipt
      : invoAlreadyAdded
      ? oErrors.duplicateInvo
      : false;

    console.log("outFormError function result was was", outFormError);

    return outFormError;
  };

  const handleAddInvo = (event) => {
    event.preventDefault();
    const invoFormError = errorInInvoForm();

    if (invoFormError) {
      console.log(invoFormError);
      setSessionMRV((draft) => {
        draft.locSt.AllEntry30.activeError1 = invoFormError;
      });
    } else {
      setSessionInvosMRV({
        invosRtStr: "sessionInvos",
        invoNum: parentRt.input1,
        actionType: "add",
      });

      // clear the input fields in the local state.
      let outLocState = { ...cloneDeep(parentRt), ...clearedInputs };
      setSessionMRV((draft) => {
        draft.locSt.AllEntry30 = outLocState;
      });
    }
  };

  return (
    <form
      id={"addInvoForm"}
      className={`inputSection`}
      onSubmit={handleAddInvo}
    >
      <MRVinput
        flex={"1 1 0rem"}
        width={`100%`}
        hasError={
          activeErrorStr === oErrors.duplicateInvo.str ||
          activeErrorStr === oErrors.invalidReceipt.str
        }
      >
        <input
          type="text"
          placeholder="Receipt Number"
          value={parentRt.input1}
          onChange={(event) => {
            const fieldInput = event.target.value.toUpperCase();
            setSessionMRV((draft) => {
              draft.locSt.AllEntry30.input1 = fieldInput;
            });
          }}
        />
      </MRVinput>
      <div className={`inputRow`}>
        <MRVinput flex={"2 2 0rem"}>
          <input placeholder="Store" type="text" />
        </MRVinput>
        <MRVinput flex={"3 3 0rem"}>
          <input type="date" placeholder="Sale Date" />
        </MRVinput>
      </div>
      <div className={`inputRow`}>
        <button
          form="addInvoForm"
          type="submit"
          className={`secondary minWidth`}
        >
          Add Receipt
        </button>
      </div>
      <p className={`warning`}>{activeErrorStr}</p>
    </form>
  );
};

export { InvoEntry_SC_STRX };
