import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { LabeledValueMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/LabeledValueMRV";

import { useNodeNav, atomRelationizer, atomAggregator } from "../../../../../mrv/MRVhooks/MRVhooks";
import { useOutletContext } from "react-router-dom";

import { returnAtom, atomRelatives } from "../../../../../globalFunctions/globalJS_classes";

function ReviewItemCardSTRX({ relatedAtomsArr = [] }) {

  const itemAtomsArr = relatedAtomsArr;

  const uiItemRow = ({ atom = new returnAtom({}) }) => {
    return (
      <div className={`hBox`} key={atom.atomItemNum}>
        <MRVitemDetails thisItemAtom={atom} />
        <LabeledValueMRV
          labelStr={"Qty"}
          valueStr={atom.atomItemQty}
          size={"S"}
        />
      </div>
    );
  };

  return (
    <div
      className={`itemRow subCardStyle ${activeClass}`}
      onClick={(e) => handleClick(e)}
    ></div>
  );
}

export { ReviewItemCardSTRX };