import { useOutletContext } from "react-router-dom";
import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";
import { RejectionMRV } from "../../../../components/ui/rejection/RejectionMRV";
import { dProduct } from "../../../../mrv_data_types";
import { ColumnLabel } from "../../../../components/ui/column_header/ColumnLabel";

function ReturnRejects() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const oDerived = mrvCtx.oDerived;

  const oC1 = {
    c11: dProduct({
      sKey: "3300",
      sBifrostKey: "3300",
      iQty: 33,
    }),
    c12: dProduct({
      sKey: "4400",
      sBifrostKey: "4400",
      iQty: 44,
    }),
  };

  const oC2 = {
    c21: dProduct({
      sKey: "5500",
      sBifrostKey: "5500",
      iQty: 55,
    }),
  };

  return (
    <main className={`mrvPage returnPhase`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={`Items Removed From Exchange`} />
        <div className={`body`}>
          <ColumnLabel
            sIconKey="cart"
            sMainTitle="Return"
            sMiniSubtext="Do a return, ya filthy animal"
          />
        </div>
        <FooterCWEX />
      </div>
    </main>
  );
}

export { ReturnRejects };
