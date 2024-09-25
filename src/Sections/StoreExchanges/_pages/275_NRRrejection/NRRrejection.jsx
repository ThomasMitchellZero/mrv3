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
} from "../../../../mrv/MRVhooks/MRVhooks";
import { cloneDeep } from "lodash";

function NRRrejection() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();

  const aNRRitems = sessionMRV.atomizedReturnItems.filter(
    (atom) => !Boolean(atom.atomInvoNum)
  );

  const aReceiptedItems = sessionMRV.atomizedReturnItems.filter((atom) =>
    Boolean(atom.atomInvoNum)
  );

  // New arr of ReturnItems with NRR items removed.  Will be new ReturnItems cart.
  const aReceiptedCart = primaryAtomizer({
    repo1: aReceiptedItems,
    repo2: sessionMRV.returnItems,
    comparisonFn: ({ repo1Atom, repo2Atom }) =>
      repo1Atom?.atomItemNum === repo2Atom?.atomItemNum,
  });

  const oNRRrejections = new RejectionObj({
    rejectsArr: aNRRitems,
    strLabel: "These items cannot be returned without receipts.",
  });

  // fill with all rejection types.  Might have more in the future.
  const aAllRejections = [oNRRrejections];

  const uiRejectionCards = aAllRejections.map((rej, i) => {
    return <RejectionCard key={i} rejectionObj={rej} />;
  });

  const handleContinue = (e) => {
    // This is where the NRR items exit the transaction, so we set returnItems to ONLY the we have receipts for.
    // We don't want them containing fields from the atomized array, so returnItems is replaced.

    /*

    let currentSessionState = cloneDeep(sessionMRV);
    outSessionState.returnItems = aReceiptedCart;
    const outSessionState = returnAutoDeriver(currentSessionState);

        console.log(outSessionState);

    // NOT WORKING.
    setSessionMRV(() => {
      return returnAutoDeriver(outSessionState);
    });
    
    */

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
