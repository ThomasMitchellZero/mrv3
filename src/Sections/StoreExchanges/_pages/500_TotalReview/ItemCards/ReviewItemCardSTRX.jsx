import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { LabeledValueMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/LabeledValueMRV";

import { centsToDollars } from "../../../../../mrv/MRVhooks/MRVhooks";
import { useOutletContext } from "react-router-dom";

import {
  returnAtom,
  atomRelatives,
} from "../../../../../globalFunctions/globalJS_classes";

function ReviewItemCardSTRX({
  cart = "return",
  REF__cart____return_new,
  oRelatedAtoms = new atomRelatives({}),
}) {
  const oConfigs = {
    return: {
      labelPrefix: "Return",
      valClass: "color__green__text",
    },
    new: {
      labelPrefix: "New",
      valClass: "color__primary__text",
    },
  };

  const itemAtomsArr = oRelatedAtoms.parentAndChildren;
  console.log("itemAtomsArr", itemAtomsArr);

  const uiItemTile = ({ tileAtom = new returnAtom({}) }) => {
    return (
      <div className={`hBox alignStart`} key={tileAtom.atomItemNum}>
        <MRVitemDetails
          thisItemAtom={tileAtom}
          twoLineDescription={true}
          showPrice={false}
          showQty={false}
        />
        <LabeledValueMRV
          labelStr={`${oConfigs[cart].labelPrefix} Qty: ${tileAtom.atomItemQty}`}
          valueStr={`$${centsToDollars(tileAtom.atomMoneyObj.unitTotal)}`}
          sValueClasses={`${oConfigs[cart].valClass} heading__small`}
          size={"S"}
        />
      </div>
    );
  };

  const uiCardItemTiles = itemAtomsArr.map((atom) =>
    uiItemTile({ tileAtom: atom })
  );

  return <div className={`vBox cardStyle`}>{uiCardItemTiles}</div>;
}

export { ReviewItemCardSTRX };
