import { ContinueBtnMRV } from "../../../../mrv/mrv-components/inputs/ContinueBtnMRV";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";
import { RejectionCard } from "../../../../mrv/mrv-components/DisplayOutputs/Rejection/RejectionCard";
import { ColumnLabelMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ColumnLabelMRV/ColumnLabelMRV";

import { RejectionObj } from "../../../../globalFunctions/globalJS_classes";

import { useOutletContext } from "react-router";

import {
  useNodeNav,
  useSetSessionItems,
  primaryAtomizer,
  returnAutoDeriver,
  setSessionItem,
} from "../../../../mrv/MRVhooks/MRVhooks";
import { clone, cloneDeep } from "lodash";

function UnpairedRejection() {
  const nodeNav = useNodeNav();
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const setReturnItems = useSetSessionItems({
    targetStateArrKey: "returnItems",
  });
  const setNewItems = useSetSessionItems({ targetStateArrKey: "newItems" });

  const atomizedForPeers = primaryAtomizer({
    repo1: sessionMRV.returnItems,
    repo2: sessionMRV.newItems,
    comparisonFn: ({ repo1Atom, repo2Atom }) => {
      return repo1Atom.atomItemNum === repo2Atom.atomItemNum;
    },
  });

  console.log(atomizedForPeers);

  const returnUnpaired = atomizedForPeers.unmerged1;
  const newUnpaired = atomizedForPeers.unmerged2;
  const paired = atomizedForPeers.mergedRepo;

  const returnRejects = new RejectionObj({
    rejectsArr: returnUnpaired,
    strLabel: (
      <p className={`body color__primary__text`}>
        These<span className={`bold`}> Return Items </span>have no matching
        items in the
        <span className={`bold`}> New Items </span>cart.
      </p>
    ),
  });

  const newRejects = new RejectionObj({
    rejectsArr: newUnpaired,
    strLabel: (
      <p className={`body color__primary__text`}>
        These<span className={`bold`}> New Items </span>have no matching items
        in the
        <span className={`bold`}> Return Items </span>cart.
      </p>
    ),
  });

  const uiUnpairedReturnItems =
    returnUnpaired.length > 0 ? (
      <div className={`vBox maxWidth_50pct`}>
        <ColumnLabelMRV
          iconStr={`box`}
          bigLabel={`Return Items Removed`}
          smallLabel={`Items may be eligible for a return in a separate transaction.`}
        />
        <RejectionCard rejectionObj={returnRejects} />
      </div>
    ) : null;
  const uiUnpairedNewItems =
    newUnpaired.length > 0 ? (
      <div className={`vBox maxWidth_50pct`}>
        <ColumnLabelMRV
          iconStr={`box`}
          bigLabel={`New Items Removed`}
          smallLabel={`Customer will not receive these items in this exchange.`}
        />
        <RejectionCard rejectionObj={newRejects} />
      </div>
    ) : null;

  /*



  ---

    const aNRRitems = sessionMRV.atomizedReturnItems.filter(
    (atom) => !Boolean(atom.atomInvoNum)
  );

  const aReceiptedItems = sessionMRV.atomizedReturnItems.filter((atom) =>
    Boolean(atom.atomInvoNum)
  );

  console.log(aReceiptedItems);

  const oUnpairedRejections = new RejectionObj({
    rejectsArr: aNRRitems,
    strLabel: "These items cannot be returned without receipts.",
  });

  // fill with all rejection types.  Might have more in the future.
  const aAllRejections = [oUnpairedRejections];

  const uiRejectionCards = aAllRejections.map((rej, i) => {
    return <RejectionCard key={i} rejectionObj={rej} />;
  });

  let outReturnItems = [];

  // Re-add all receipted items to the returnItems array.  Could technically subtract, but I'm pretty sure this works.
  for (const receiptedAtom of aReceiptedItems) {
    console.log(receiptedAtom);
    const outArray = setSessionItem({
      arrToSet: outReturnItems,
      itemAtom: receiptedAtom,
      actionType: "add",
      newQty: receiptedAtom.atomItemQty,
    });

    outReturnItems = outArray;
  }
  
  */

  const handleContinue = (e) => {
    nodeNav("totalReview");
  };

  return (
    <section className={`newItems mrvPage color__surface__subdued`}>
      <main className={`mrvPanel__main`}>
        <TitleBarSTRX
          showProductName={true}
          headerTitle={`Items Removed From Exchange`}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>
          <div className={`hBox gap2rem alignStart justifyCenter`}>
            {uiUnpairedReturnItems}
            {uiUnpairedNewItems}
          </div>
        </div>
        <div className={`footer_content`}>
          <CashTotalSTRX />
          <ContinueBtnMRV handleClick={(e) => handleContinue(e)} />
        </div>
      </main>
    </section>
  );
}

export { UnpairedRejection };
