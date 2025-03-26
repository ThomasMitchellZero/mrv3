import { bifrostAPI } from "../../../../../../../../local_APIs/bifrost";
import { useState, useContext } from "react";
import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router-dom";
import { ReturnPhase_locState } from "../../../ReturnPhase_schemas";
import { baseStateExTurns } from "../../../../../../../mrv_data_types";
import { addItem } from "../../../../../../../mrv_controller";
import { dProduct } from "../../../../../../../mrv_data_types";

function ItemInputs({ pageLS, fSetPageLS }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const bifrost = useContext(bifrostAPI);

  const oInitLS = {
    sItemKey: "",
    iQty: "",
  };

  const [thisLS, setThisLS] = useState(oInitLS);

  // Item Inputs //////////////////////////////////////////////
  const handleItemInput = (e) => {
    const draft = cloneDeep(thisLS);
    draft.sItemKey = e.target.value;
    setThisLS(draft);
  };

  const handleQtyInput = (e) => {
    const draft = cloneDeep(thisLS);
    draft.iQty = Math.max(0, Number(e.target.value)); // no values below 0
    setThisLS(draft);
  };

  // Submit //////////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attempting submit");
    const refLS = ReturnPhase_locState;
    const refBaseStateExTurns = baseStateExTurns;
    const sItemKey = thisLS.sItemKey;
    const iQty = thisLS.iQty;

    // Check for invalid item
    const bInvalidItem = !(sItemKey in bifrost);
    if (bInvalidItem) {
      const draftPage = cloneDeep(pageLS);
      draftPage.sActiveError = "invalidItem";
      fSetPageLS(draftPage);
      return;
    }

    // Check for invalid quantity
    const bInvalidQty = isNaN(iQty) || iQty < 1;
    if (bInvalidQty) {
      const draftPage = cloneDeep(pageLS);
      draftPage.sActiveError = "invalidQty";
      fSetPageLS(draftPage);
      return;
    }

    // If all validity checks pass, add the item to the session

    const draftMRV = cloneDeep(sessionMRV);
    draftMRV.returnItems = addItem({
      oTargetRepo: sessionMRV.returnItems,
      oItemToAdd: dProduct({
        iQty: thisLS.iQty,
        sItemNum: thisLS.sItemKey,
      }),
    });
    setSessionMRV(draftMRV);
    setThisLS(oInitLS);
  };

  const sError = pageLS.sActiveError;
  const bItemError = sError === "invalidItem" || sError === "invalidQty";
  const uiError = bItemError ? (
    <p className={`warning width__max text__align__right`}>
      {pageLS.oErrorObjects[sError].sMessage}
    </p>
  ) : null;

  return (
    <form
      id="rtrnItemInput"
      onSubmit={handleSubmit}
      className={`vBox itemInput gap__1rem width__max flex__min`}
    >
      <input
        type="text"
        placeholder="Item Number"
        className={`width__max`}
        value={thisLS.sItemKey}
        onChange={handleItemInput}
      />
      <div className={`hBox gap__05rem`}>
        <input
          type="number"
          placeholder="Qty"
          className={`itemQty`}
          min={0}
          value={thisLS.iQty}
          onChange={handleQtyInput}
        />
        <div className={`flex__max`}></div>
        <button
          className={`addItemBtn secondary`}
          type="submit"
          form="rtrnItemInput"
        >
          Add Item
        </button>
      </div>
      {uiError}
    </form>
  );
}

export { ItemInputs };
