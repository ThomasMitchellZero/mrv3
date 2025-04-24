import { useOutletContext } from "react-router-dom";
import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";
import { CartRejection } from "../../../../components/ui/rejection/RejectionMRV";

function ReturnRejects() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const oDerived = mrvCtx.oDerived;

  return (
    <main className={`mrvPage returnPhase`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={`Items Removed From Exchange`} />
        <div className={`body`}>Eject Me, Daddy</div>
        <FooterCWEX />
      </div>
    </main>
  );
}

export { ReturnRejects };
