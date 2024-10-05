

import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ColumnLabelMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ColumnLabelMRV/ColumnLabelMRV";

import { Sidesheet_Base_MRV } from "../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

import {
  useNodeNav,
  atomFuser,
  atomRelationizer,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { RejectionObj } from "../../../../globalFunctions/globalJS_classes";
import { RejectionCard } from "../../../../mrv/mrv-components/DisplayOutputs/Rejection/RejectionCard";
import {
  returnAtom,
  moneyObj,
} from "../../../../globalFunctions/globalJS_classes";

import { useOutletContext } from "react-router";

function TotalReviewSTRX() {
  const nodeNav = useNodeNav();

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  // re-aggregate the atomized Return and New items
  const sharedIdenticalityKeys = ["atomItemNum", "parentKey"];

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
  const aReturnRelations = Object.values(oFusedNewAtoms);
  const aNewRelations = Object.values(oFusedNewAtoms);

  const cardMaker = ({ atom = new returnAtom({}) }) => {
    return (
      <div className={`itemRow subCardStyle`} key={atom.atomItemNum}>
        <ColumnLabelMRV
          labelStr={atom.atomItemName}
          valueStr={atom.atomItemQty}
          size={"S"}
        />
      </div>
    );
  };
  //

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarSTRX
          showNavNodeBar={true}
          headerTitle={"Total Review"}
        ></TitleBarSTRX>
        <div className={`main_content`}>Total Review Placeholder</div>
      </section>
    </section>
  );
}

export { TotalReviewSTRX };

/*



*/
