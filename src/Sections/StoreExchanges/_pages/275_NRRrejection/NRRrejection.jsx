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

function NRRrejection() {

  const nodeNav = useNodeNav();
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const aNRRitems = sessionMRV.atomizedReturnItems.filter(
    (atom) => !Boolean(atom.atomInvoNum)
  );

  const aReceiptedItems = sessionMRV.atomizedReturnItems.filter((atom) =>
    Boolean(atom.atomInvoNum)
  );

  console.log(aReceiptedItems);

  const oNRRrejections = new RejectionObj({
    rejectsArr: aNRRitems,
    strLabel: "These items cannot be returned without receipts.",
  });

  // fill with all rejection types.  Might have more in the future.
  const aAllRejections = [oNRRrejections];

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

  const handleContinue = (e) => {
    // This is where the NRR items exit the transaction, so we set returnItems to ONLY the we have receipts for.
    // We don't want them containing fields from the atomized array, so returnItems is replaced.

    let outSessionState = cloneDeep(sessionMRV);

    outSessionState.returnItems = outReturnItems;
    outSessionState = returnAutoDeriver(outSessionState);

    setSessionMRV(() => {
      return outSessionState;
    });

    nodeNav("newitems");
  };

  return (
    <section className={`newItems mrvPage color__surface__subdued`}>
      <main className={`mrvPanel__main`}>
        <TitleBarSTRX
          showProductName={true}
          headerTitle={`No Receipts Found For items`}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>
          <ColumnLabelMRV
            iconStr={`box`}
            bigLabel={`No Receipts Found`}
            smallLabel={`These items cannot be returned without receipts.`}
          />
          {uiRejectionCards}
        </div>
        <div className={`footer_content`}>
          <CashTotalSTRX />
          <ContinueBtnMRV handleClick={(e) => handleContinue(e)} />
        </div>
      </main>
    </section>
  );
}

export { NRRrejection };
