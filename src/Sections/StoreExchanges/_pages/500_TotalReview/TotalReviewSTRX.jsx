import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ColumnLabelMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ColumnLabelMRV/ColumnLabelMRV";

import { Sidesheet_Base_MRV } from "../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import { RejectionObj } from "../../../../globalFunctions/globalJS_classes";
import { RejectionCard } from "../../../../mrv/mrv-components/DisplayOutputs/Rejection/RejectionCard";
import {
  returnAtom,
  moneyObj,
} from "../../../../globalFunctions/globalJS_classes";

function TotalReviewSTRX() {
  const nodeNav = useNodeNav();

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
