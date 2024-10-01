import { MessageRibbonMRV } from "../MessageRibbonMRV";
import {
  RejectionObj,
  returnAtom,
} from "../../../../globalFunctions/globalJS_classes";
import { BigLabeledValue } from "../BigLabeledValue";
import { MRVitemDetails } from "../mrvItemDetails";

function RejectionCard({ rejectionObj = new RejectionObj({}) }) {
  const ribbonMsg = rejectionObj.strLabel;
  const aRejects = rejectionObj.rejectsArr;

  const rejectTile = (atom) => {
    const refAtom = new returnAtom({});
    return (
      <div key={atom.atomItemNum} className={`hBox minFlex maxWidth`}>
        <MRVitemDetails thisItemAtom={atom} showPrice={false} showQty={false} />
        <BigLabeledValue
          labelStr="Qty Removed"
          valueStr={atom.atomItemQty}
          size="M"
        />
      </div>
    );
  };

  const uiRejectTiles = aRejects.map((atom) => {
    return rejectTile(atom);
  });

  return (
    <div className="cardStyle vBox minFlex">
      <MessageRibbonMRV
        className={`maxWidth`}
        message={ribbonMsg}
        type={`critical`}
      />
      {uiRejectTiles}
    </div>
  );
}

export { RejectionCard };
