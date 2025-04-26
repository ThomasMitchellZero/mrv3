import { useOutletContext } from "react-router-dom";
import { useNodeNav } from "../../../../mrv_controller";
import { dLocalCtx, dError, oBaseLocState } from "../../../../mrv_data_types";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";
import { RejectionMRV } from "../../../../components/ui/rejection/RejectionMRV";
import { RejectCard } from "../../../../components/ui/rejection/comps_rejection/RejectCard";
import { RejectTile } from "../../../../components/ui/rejection/comps_rejection/reject_tile/RejectTile";
import { dProduct } from "../../../../mrv_data_types";
import { ColumnLabel } from "../../../../components/ui/column_header/ColumnLabel";
import { MessageRibbon } from "../../../../components/ui/message_ribbon/MessageRibbon";

function ReturnRejects() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const oDerived = mrvCtx.oDerived;

  //----------------------------------------------------
  // Page Logic
  //----------------------------------------------------

  //----------------------------------------------------
  // UI Elements
  //----------------------------------------------------

  const uiNRRtiles = Object.values(oDerived.oNRRitems).map((oProduct) => {
    return <RejectTile key={oProduct.sKey} oProduct={oProduct} />;
  });
  const uiNRRcard = (
    <RejectCard
      uiCardLabel={
        <MessageRibbon
          sType="alert"
          sMessage="These items are missing receipts."
        />
      }
      children={uiNRRtiles}
    />
  );

  //----------------------------------------------------
  // Final Component
  //----------------------------------------------------

  return (
    <main className={`mrvPage return-rejects`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={`Items Removed From Exchange`} />
        <div className={`hBox justify__center align__start gap__2rem`}>
          <div className={`vBox gap__1rem cardCol__half`}>
            <ColumnLabel
              sIconKey="cart"
              sMainTitle="Return"
              sMiniSubtext="Do a return, ya filthy animal"
            />
            {uiNRRcard}
          </div>
        </div>
        <FooterCWEX />
      </div>
    </main>
  );
}

export { ReturnRejects };
