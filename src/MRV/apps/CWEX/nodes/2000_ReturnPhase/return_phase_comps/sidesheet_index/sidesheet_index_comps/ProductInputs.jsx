import { bifrostAPI } from "../../../../../../../../local_APIs/bifrost";
import { useState, useContext } from "react";
import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router-dom";
import { baseStateExTurns } from "../../../../../../../mrv_data_types";
import { addItem } from "../../../../../../../mrv_controller";
import { dProduct } from "../../../../../../../mrv_data_types";
import { MdChevronRight } from "react-icons/md";

function ProductInputs({ oPage }) {
  const pageLS = oPage.oLocalState;
  const fSetPageLS = oPage.fSetLocalState;

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const bifrost = useContext(bifrostAPI);

  const oInitThisLS = {
    sItemKey: "",
    iQty: "",
  };

  const [thisLS, setThisLS] = useState(oInitThisLS);

  // Item Inputs //////////////////////////////////////////////
  const handleItemInput = (e) => {
    const draft = cloneDeep(thisLS);
    draft.sItemKey = String(e.target.value);
    setThisLS(draft);
  };

  const handleQtyInput = (e) => {
    const draft = cloneDeep(thisLS);
    draft.iQty = Math.max(0, Number(e.target.value)); // no values below 0
    setThisLS(draft);
  };

  const handleLWclick = (e) => {
    e.stopPropagation();
    const draftPage = {
      ...pageLS,
      ...oPage.oResets.errorOnly,
      sActiveOverlay: "lw",
    };
    fSetPageLS(draftPage);
  };

  // Submit //////////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attempting submit");
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

    const refState = baseStateExTurns({});
    const draftMRV = cloneDeep(sessionMRV);

    // use the standard addItem function to add the item to the returnItems repo
    draftMRV.returnItems = addItem({
      oTargetRepo: sessionMRV.returnItems,
      oItemToAdd: dProduct({
        iQty: thisLS.iQty,
        sBifrostKey: thisLS.sItemKey,
        sKey: `_${thisLS.sItemKey}`, // session keys have "_" prefix to coerce them to strings.
      }),
    });

    setSessionMRV(draftMRV);
    setThisLS(oInitThisLS);
  };

  const sError = pageLS.sActiveError;
  const bItemError = sError === "invalidItem" || sError === "invalidQty";
  const uiError = bItemError ? (
    <p className={`warning width__max text__align__right`}>
      {oPage.oErrorObjects[sError].sMessage}
    </p>
  ) : null;

  return (
    <form
      id="rtrnProductInputs"
      onSubmit={handleSubmit}
      className={`vBox productInput gap__2rem width__max flex__min`}
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
          form="rtrnProductInputs"
        >
          Add Item
        </button>
      </div>
      {uiError}
      <div className={`vBox gap__2rem flex__min width__max`}>
        <div className={`divider horizontal`} />
        <div className={`hBox justify__end`}>
          <button className={`secondary`} type="button" onClick={handleLWclick}>
            Unlisted Item
            <MdChevronRight size={`2rem`} />
          </button>
        </div>
      </div>
    </form>
  );
}

export { ProductInputs };
