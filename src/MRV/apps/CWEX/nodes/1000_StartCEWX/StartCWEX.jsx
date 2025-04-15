import { useOutletContext } from "react-router-dom";
import { useNodeNav } from "../../../../mrv_controller";
import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { fLuneLenser } from "../../../../mrv_controller";
import { dProduct } from "../../../../mrv_data_types";

const StartCWEX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();

  const oReturnItems = {
    AA: dProduct({
      sKey: "AA",
      sBifrostKey: "AA",
      iQty: 11,
    }),
    BB: dProduct({
      sKey: "BB",
      sBifrostKey: "BB",
      iQty: 22,
    }),
    CC: dProduct({
      sKey: "CC",
      sBifrostKey: "CC",
      iQty: 33,
    }),
    DD: dProduct({
      sKey: "DD",
      sBifrostKey: "DD",
      iQty: 4,
    }),
  };

  const oInvoItems = {
    AA_nnn: dProduct({
      sKey: "AA_nnn",
      sBifrostKey: "AA",
      iQty: 5,
      sInvoNum: "nnn",
    }),
    BB_nnn: dProduct({
      sKey: "BB_nnn",
      sBifrostKey: "BB",
      iQty: 22,
      sInvoNum: "nnn",
    }),
    CC_nnn: dProduct({
      sKey: "CC_nnn",
      sBifrostKey: "CC",
      iQty: 99,
      sInvoNum: "nnn",
    }),
    AA_mmm: dProduct({
      sKey: "AA_mmm",
      sBifrostKey: "AA",
      iQty: 6,
      sInvoNum: "mmm",
    }),

    EE_nnn: dProduct({
      sKey: "EE_nnn",
      iQty: 1,
      sInvoNum: "nnn",
    }),
  };

  const testTrisection = fLuneLenser({
    oOuterRepo: oReturnItems,
    oInnerRepo: oInvoItems,
    fIsMatch: (oCircle1, oCircle2) => {
      return oCircle1.sBifrostKey === oCircle2.sBifrostKey;
    },
    fBuildLens: ({ oCircle1, oCircle2 }) => {
      const oNewItem = dProduct({
        sBifrostKey: oCircle1.sBifrostKey,
        sInvoNum: oCircle2.sInvoNum,
      });
      oNewItem.sKey = `_${oNewItem.sBifrostKey}_${oNewItem.sInvoNum}`;
      return oNewItem;
    },
  });

  return (
    <main className={`mrvPage exchEntry`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={"Start Carry With Exchanges"} />
        <div className={`body`}>
          <div className={`vBox align__center`}>
            <button className={`primary`} onClick={() => nodeNav("exchEntry")}>
              CWEX Test 1
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export { StartCWEX };
