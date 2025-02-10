import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import {
  useResetLocStFields,
  useSetLocStFields,
  useSetSessionItems,
} from "../../../../../../../mrv/MRVhooks/MRVhooks";

import { MdClose } from "react-icons/md";

import {
  returnAtom,
  moneyObj,
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

  const setSessionItems = useSetSessionItems({
    targetStateArrKey: "returnItems",
  });
  const resetPageLS = useResetLocStFields("page");
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
        atomMoneyObj: new moneyObj({
          unitBaseValue: bifrostCtx[replacementItemNum].price,
        }),
      });
      outItemAtom.atomMoneyObj.invertValue();
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

  const handleConfirmAdd = (e) => {
    e.stopPropagation();

    const qtyMatch = lwLocSt.input3 === lwLocSt.input12;

    if (qtyMatch) {
      // description of the replacement item.
      const repBifrostText =
        bifrostCtx[lwLocSt.activeData1.atomItemNum].description;
      // creating the LW Return item.
      // XXX at the moment, this contains no reference to the replacement.  
      const outItemAtom = new returnAtom({
        atomItemNum: `00100X${lwLocSt.activeData1.bifrostKey}`,
        atomItemQty: lwLocSt.input12,
        bifrostKey: `00100`,
        customDescription: `Lifetime Warranty Replacement: ${repBifrostText}`,
      });
      setSessionItems({ itemAtom: outItemAtom, actionType: "add", newQty: lwLocSt.input12 });

      resetLwRtrnFormLS({ EVERYONE: true });
      resetPageLS({ activeOverlay1: true });
    } else {
      setLwRtrnFormLS({
        activeError1: lwLocSt.oErrorObjects["invalidQty"],
      });
    }
  };

  const sQtyError = oActiveError?.key === "invalidQty" ? oActiveError.str : "";

  const uiReplacementItem = (
    <div className={`vBox minFlex`}>
      <div className={`hBox minFlex body__small color__primary__text`}>
        Replacement Item
      </div>
      {lwLocSt.activeData1 && (
        <MRVitemDetails
          descriptionLineLimit={1}
          showQty={false}
          thisItemAtom={lwLocSt.activeData1}
          size="M"
          showPrice={true}
          showChildArrow={false}
        />
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
              className={`${sQtyError ? "error" : ""}`}
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
      <div className={`divider horizontal`} />
      <div className={`hBox minFlex`}>
        <div className={`hBox warning maxFlex`}>{sQtyError}</div>
        <button onClick={handleConfirmAdd} className={`primary`}>
          Confirm & Add
        </button>
      </div>
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
