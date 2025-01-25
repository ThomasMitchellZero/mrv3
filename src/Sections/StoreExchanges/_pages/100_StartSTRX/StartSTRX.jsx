import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ColumnLabelMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ColumnLabelMRV/ColumnLabelMRV";

import { ScrimOverlay } from "../../../../mrv/mrv-components/DisplayOutputs/ScrimOverlay/ScrimOverlay";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import { RejectionObj } from "../../../../globalFunctions/globalJS_classes";
import { RejectionCard } from "../../../../mrv/mrv-components/DisplayOutputs/Rejection/RejectionCard";
import {
  returnAtom,
  moneyObj,
} from "../../../../globalFunctions/globalJS_classes";

function StartSTRX() {
  const nodeNav = useNodeNav();

  const reject1 = new RejectionObj({
    strLabel: "This was a disaster",
    rejectsArr: [
      new returnAtom({
        atomItemNum: "3300",
        atomItemQty: 3,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 599,
        }),
      }),
      new returnAtom({
        atomItemNum: "5500",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 450,
        }),
      }),
    ],
  });

  const reject2 = new RejectionObj({
    strLabel: "You're at the absolute peak of the bell curve",
    rejectsArr: [
      new returnAtom({
        atomItemNum: "5500",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 599,
        }),
      }),
      new returnAtom({
        atomItemNum: "4400",
        atomItemQty: 4,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 1499,
        }),
      }),
    ],
  });

  console.log(reject1);

  const uiRejectStuff = (
    <>
      <ColumnLabelMRV
        iconStr="cart"
        bigLabel="All Transactions Have Failed Completely"
        smallLabel="Have you considered a career in politics?"
      />
      <RejectionCard rejectionObj={reject1} />
      <RejectionCard rejectionObj={reject2} />
    </>
  );

  return (
    <section className={`mrvPage`}>

      <section className={`mrvPanel__main`}>
        <TitleBarSTRX
          showNavNodeBar={true}
          headerTitle={"Choose Scenario"}
        ></TitleBarSTRX>
        <div className={`main_content gap2rem alignLeft padding__vertical`}>
          <button
            type="button"
            onClick={() => {
              nodeNav("replacementCheck");
            }}
            className={`mrvBtn primary`}
          >
            Test Scenario 1
          </button>
        </div>
      </section>
    </section>
  );
}

export { StartSTRX };

/*



*/
