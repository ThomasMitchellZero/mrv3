import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../../mrv/MRVhooks/MRVhooks";

import { MdClose } from "react-icons/md";

import {
  returnAtom,
  locStFields,
} from "../../../../../../../globalFunctions/globalJS_classes";

import { MRVitemDetails } from "../../../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { DescriptorIcon } from "../../../../../../../mrv/mrv-components/DisplayOutputs/IconComponents/DescriptorIcon";
import ProductContext from "../../../../../../../store/product-context";

function ReplacementCluster({ showOnlyIf = true }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const lwLocSt = sessionMRV.locSt.LwRtrnForm;
  const bifrostCtx = useContext(ProductContext);

  const setLwRtrnFormLS = useSetLocStFields("LwRtrnForm");
  const resetLwRtrnFormLS = useResetLocStFields("LwRtrnForm");
  const oActiveError = lwLocSt.activeError1;

  // Cluster for adding a replacement item
  const handleAddReplacement = (e) => {
    e.stopPropagation();
    const refLocFields = locStFields;
    const replacementItemNum = lwLocSt.input11;
    // verify the item is actually in Bifrost

    if (replacementItemNum in bifrostCtx) {
      const outItemAtom = new returnAtom({
        atomItemNum: replacementItemNum,
        atomItemQty: 1,
      });
      setLwRtrnFormLS({ activeData1: outItemAtom });
      resetLwRtrnFormLS({ activeErrorALL: true });
    } else {
      setLwRtrnFormLS({
        activeError1: lwLocSt.oErrorObjects["invalidItemNum"],
      });
    }
  };

  const sItemNumError =
    oActiveError?.key === "invalidItemNum" ? oActiveError.str : "";

  const uiReplacementInput = (
    <div className={`vBox minFlex`}>
      <div className={`hBox minFlex body__small color__primary__text`}>
        Scan/Enter Similar Replacement Item
      </div>
      <div className={`hBox minFlex`}>
        <DescriptorIcon iconStr="barcode" color="color__interactive__text" />
        <input
          type="text"
          value={lwLocSt.input11}
          placeholder="Replacement Item #"
          className={`maxFlex ${sItemNumError ? "error" : ""}`}
          onChange={(e) => setLwRtrnFormLS({ input11: e.target.value })}
        />
      </div>
      <div className={`hBox minFlex`}>
        <div className={`hBox warning`}>{sItemNumError}</div>
        <button className={`secondary`} onClick={handleAddReplacement}>
          Apply
        </button>
      </div>
    </div>
  );

  // Valid Replacement Item provided

  const handleQtyInput = (event) => {
    const newQty = Number(event.target.value);
    setLwRtrnFormLS({ input12: newQty });
  };

  const handleQtyPlus = () => {
    const newQty = Number(lwLocSt.input12) + 1;
    setLwRtrnFormLS({ input12: newQty });
  };

  const handleQtyMinus = () => {
    const newQty = Math.max(Number(lwLocSt.input12) - 1, 0);
    setLwRtrnFormLS({ input12: newQty });
  };

  const uiReplacementItem = (
    <div className={`vBox minFlex`}>
      <div className={`hBox minFlex body__small color__primary__text`}>
        Replacement Item
      </div>
      {lwLocSt.activeData1 && (
        <MRVitemDetails showQty={false} thisItemAtom={lwLocSt.activeData1} />
      )}
      <div className={`vBox minFlex gap50pct`}>
        <div className={`hBox body__small color__primary__text`}>
          Replacement Qty
        </div>
        <div className={`hBox minFlex`}>
          <div className={`qtyInputPlusMinusCtnr`}>
            <button
              onClick={handleQtyMinus}
              disabled={lwLocSt.input12 < 1}
              className={`ghost`}
            >
              -
            </button>
            <input
              type="number"
              value={lwLocSt.input12}
              min={0}
              onChange={(e) => {
                handleQtyInput(e);
              }}
            />
            <button onClick={handleQtyPlus} className={`ghost`}>
              +
            </button>
          </div>
          <div className={`hBox maxFlex`} />
          <button
            className={`secondary`}
            onClick={() => {
              resetLwRtrnFormLS({ activeDataALL: true });
            }}
          >
            <MdClose fontSize="1.5rem" />
          </button>
        </div>
      </div>
      <div className={`hBox minFlex`}></div>
    </div>
  );

  const uiVisibleCluster = lwLocSt.activeData1
    ? uiReplacementItem
    : uiReplacementInput;

  return (
    showOnlyIf && (
      <div className={`vBox minFlex gap24rem`}>
        <div className={`divider horizontal`}></div>
        {uiVisibleCluster}
      </div>
    )
  );
}

export { ReplacementCluster };
