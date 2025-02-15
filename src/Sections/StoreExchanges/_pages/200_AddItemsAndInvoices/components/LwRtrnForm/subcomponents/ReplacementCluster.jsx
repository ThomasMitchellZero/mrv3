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

  const sInvalidItemNum = oActiveError?.key === "invalidItemNum" ? "Invalid Item Number" : "";

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
      console.log("Invalid Item Number");
      setLwRtrnFormLS({
        activeError1: lwLocSt.oErrorObjects["invalidItemNum"],
      });
    }
  };

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
          className={`maxFlex ${sInvalidItemNum ? "error" : ""}`}
          onChange={(e) => setLwRtrnFormLS({ input11: e.target.value })}
        />
      </div>
      <div className={`hBox minFlex`}>
        <div className={`hBox warning justifyEnd`}>{sInvalidItemNum}</div>
        <button className={`secondary`} onClick={handleAddReplacement}>
          Apply
        </button>
      </div>
    </div>
  );

  // Valid Replacement Item provided

  const handleConfirmAdd = (e) => {
    e.stopPropagation();

    // description of the replacement item.
    const repBifrostText =
      bifrostCtx[lwLocSt.activeData1.atomItemNum].description;
    // creating the LW Return item.
    // XXX at the moment, this contains no reference to the replacement.
    const outItemAtom = new returnAtom({
      atomItemNum: `00100X${lwLocSt.activeData1.bifrostKey}`,
      //atomItemQty: lwLocSt.input3,
      bifrostKey: `00100`,
      customDescription: `Lifetime Warranty Replacement: ${repBifrostText}`,
      bifrostEquivalent: lwLocSt.activeData1.bifrostKey,
    });
    setSessionItems({
      itemAtom: outItemAtom,
      actionType: "add",
      newQty: lwLocSt.input3,
    });

    resetLwRtrnFormLS({ EVERYONE: true });
    resetPageLS({ activeOverlay1: true });
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
      <div className={`divider horizontal`} />
      <div className={`hBox minFlex`}>
        <button
          className={`secondary`}
          onClick={() => {
            resetLwRtrnFormLS({ activeDataALL: true });
          }}
        >
          Clear Item
        </button>
        <div className={`hBox maxFlex`} />

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
