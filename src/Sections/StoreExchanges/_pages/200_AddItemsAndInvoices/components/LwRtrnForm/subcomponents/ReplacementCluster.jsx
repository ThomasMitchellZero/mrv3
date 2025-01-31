import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../../mrv/MRVhooks/MRVhooks";

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

  const handleAddReplacement = () => {
    const refLocFields = locStFields;
    const replacementItemNum = lwLocSt.input11;
    // verify the item is actually in Bifrost

    if (replacementItemNum in bifrostCtx) {
      const outItemAtom = new returnAtom({
        atomItemNum: replacementItemNum,
        atomItemQty: 1,
      });

      setLwRtrnFormLS({ activeData1: outItemAtom });
    } else {
      console.log("Item not found in Bifrost");
    }
  };

  const uiReplacementInput = (
    <div className={`vBox minFlex replacementInput`}>
      <div className={`hBox minFlex body__small color__primary__text`}>
        Scan/Enter Similar Replacement Item
      </div>
      <div className={`hBox minFlex`}>
        <DescriptorIcon iconStr="barcode" color="color__interactive__text" />
        <input
          type="text"
          value={lwLocSt.input11}
          placeholder="Replacement Item #"
          className={`maxFlex`}
          onChange={(e) => setLwRtrnFormLS({ input11: e.target.value })}
        />
      </div>
      <div className={`hBox minFlex`}>
        <div className={`hBox body__small color__primary__text`}>Fart</div>
        <button className={`secondary`} onClick={handleAddReplacement}>
          Apply
        </button>
      </div>
    </div>
  );

  // Valid Replacement Item provided

  const uiReplacementItem = (
    <div className={`vBox minFlex replacementItem`}>
      <div className={`hBox minFlex body__small color__primary__text`}>
        Replacement Item
      </div>
      <div className={`hBox minFlex`}>
        <DescriptorIcon iconStr="barcode" color="color__interactive__text" />
        <div className={`maxFlex`}>Replace Me</div>
      </div>
    </div>
  );

  const uiVisibleCluster = !showOnlyIf
    ? null
    : lwLocSt.activeData1
    ? uiReplacementItem
    : uiReplacementInput;

  return uiVisibleCluster;
}

export { ReplacementCluster };
