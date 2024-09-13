import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { useLocStMethods_STRX } from "../../_resources/components/CompHooks_STRX";
import { useOutletContext } from "react-router";
import { useContext } from "react";

import { cloneDeep, isEmpty } from "lodash";

import {
  useSetSessionInvos,
} from "../../../../mrv/MRVhooks/MRVhooks";

import InvoContext from "../../../../store/invo-context";
import ProductContext from "../../../../store/product-context";

/* &&&&&&&&&&&&&&   Receipt Entry Cluster    &&&&&&&&&&&&&&&&&&& */

const InvoEntry_SC_STRX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const locStRt = sessionMRV.locSt.AllEntry30;

  const locMethods = useLocStMethods_STRX().AddItemsAndInvos();

  const setSessionInvosMRV = useSetSessionInvos();

  const noInvos = isEmpty(sessionMRV.sessionInvos);

  const invoCtx = useContext(InvoContext);

  const activeErrorStr = locStRt?.activeError1?.str || "";

  const errorInInvoForm = () => {
    const thisInvoNum = locStRt.input1;
    const invoNumValid = thisInvoNum in invoCtx;
    const invoAlreadyAdded = thisInvoNum in sessionMRV.sessionInvos;

    let outFormError = !invoNumValid
      ? locStRt.oErrorObjects.invalidReceipt
      : invoAlreadyAdded
      ? locStRt.oErrorObjects.duplicateInvo
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
        invoNum: locStRt.input1,
        actionType: "add",
      });
      locMethods.resetForm();
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
          activeErrorStr === locStRt.oErrorObjects.duplicateInvo.str ||
          activeErrorStr === locStRt.oErrorObjects.invalidReceipt.str
        }
      >
        <input
          type="text"
          placeholder="Receipt Number"
          value={locStRt.input1}
          onChange={(event) => {
            const fieldInput = event.target.value.toUpperCase();
            setSessionMRV((draft) => {
              draft.locSt.AllEntry30.input1 = fieldInput;
            });
          }}
        />
      </MRVinput>
      <div className={`inputRow`}>
        <MRVinput flex={"2 2 4rem"}>
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
