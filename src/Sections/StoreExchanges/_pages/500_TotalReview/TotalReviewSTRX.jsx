import { ReviewItemCardSTRX } from "./ItemCards/ReviewItemCardSTRX";

import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ColumnLabelMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ColumnLabelMRV/ColumnLabelMRV";
import { CashTotalSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ContinueBtnMRV } from "../../../../mrv/mrv-components/inputs/ContinueBtnMRV";

import { Sidesheet_Base_MRV } from "../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

import {
  useNodeNav,
  atomFuser,
  atomRelationizer,
} from "../../../../mrv/MRVhooks/MRVhooks";

import {
  returnAtom,
  moneyObj,
  atomRelatives,
} from "../../../../globalFunctions/globalJS_classes";

import { useOutletContext } from "react-router";

function TotalReviewSTRX() {
  const nodeNav = useNodeNav();

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  // re-aggregate the atomized Return and New items
  const sharedIdenticalityKeys = ["atomItemNum", "parentKey", "bifrostKey"];

  const oFusedReturnAtoms = atomFuser({
    aAtomsToFuse: sessionMRV.atomizedReturnItems,
    aIdenticalityKeys: sharedIdenticalityKeys,
  });

  const oFusedNewAtoms = atomFuser({
    aAtomsToFuse: sessionMRV.atomizedNewItems,
    aIdenticalityKeys: sharedIdenticalityKeys,
  });

  console.log("oFusedReturnAtoms", oFusedReturnAtoms);
  console.log("oFusedNewAtoms", oFusedNewAtoms);

  // these will eventually need to go through the atomRelationizer, but for now, we'll just use the fused atoms
  const aReturnRelations = Object.values(oFusedReturnAtoms);
  const aNewRelations = Object.values(oFusedNewAtoms);

  const cardMaker = ({ atom = new returnAtom({}), cart }) => {
    // Take this out once the atomRelationizer is working
    const atomAndRelatives = new atomRelatives({
      mainAtom: atom,
    });

    return (
      <ReviewItemCardSTRX
        cart={cart}
        oRelatedAtoms={atomAndRelatives}
        key={atomAndRelatives.mainAtom.atomItemNum}
      ></ReviewItemCardSTRX>
    );
  };

  const uiReturnCards = aReturnRelations.map((atom) =>
    cardMaker({ atom, cart: "return" })
  );
  const uiNewCards = aNewRelations.map((atom) =>
    cardMaker({ atom, cart: "new" })
  );

  const uiReturnItemsCol =
    aReturnRelations.length > 0 ? (
      <div className={`vBox maxWidth_50pct`}>
        <ColumnLabelMRV
          iconStr={`box`}
          bigLabel={`Items Returned`}
          smallLabel={`Take items from customer.`}
        />
        {uiReturnCards}
      </div>
    ) : null;

  const uiNewItemsCol =
    aNewRelations.length > 0 ? (
      <div className={`vBox maxWidth_50pct`}>
        <ColumnLabelMRV
          iconStr={`box`}
          bigLabel={`New Items`}
          smallLabel={`Customer receives these New Items.`}
        />
        {uiNewCards}
      </div>
    ) : null;
  //

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarSTRX
          showNavNodeBar={true}
          headerTitle={"Total Review"}
        ></TitleBarSTRX>
        <div className={`main_content`}>
          <div className={`hBox gap2rem alignStart justifyCenter`}>
            {uiReturnItemsCol}
            {uiNewItemsCol}
          </div>
        </div>
        <div className={`footer_content`}>
          <CashTotalSTRX />
          <ContinueBtnMRV btnText="Finish" />
        </div>
      </section>
    </section>
  );
}

export { TotalReviewSTRX };

/*



*/
