// For STRX-specific configurations of stock MRV components

import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../../../mrv/mrv-components/DisplayOutputs/CashTotalMRV";
import { baseReturnState } from "../../../../globalFunctions/globalJS_classes";
import { NavNodeBarMRV } from "../../../../mrv/mrv-components/inputs/NavNodeBarMRV";
import { useOutletContext } from "react-router";
import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";
import { useCompHooks_MRV } from "../../../../mrv/mrv-components/CompHooksMRV";
import { BigLabeledValue } from "../../../../mrv/mrv-components/DisplayOutputs/BigLabeledValue";
import { ReasonBadgeMRV } from "../../../../mrv/mrv-components/inputs/ReasonPicker/ReasonBadge";

const TitleBarSTRX = ({
  hasIcon = null,
  showProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  showNavNodeBar = false,
  navBtnClick = () => {
    console.log("nothing here");
  },
}) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const nodeNavMRV = useNodeNav();

  const navNodeBarSTRX = (
    <NavNodeBarMRV sessionState={sessionMRV} setSessionState={setSessionMRV} />
  );

  return (
    <TitleBarMRV
      hasIcon={hasIcon}
      productName="Store Exchanges"
      showProductName={showProductName}
      headerTitle={headerTitle}
      hasCluster={hasCluster}
      srString=""
      navBtnClick={navBtnClick}
      handleClearSession={() => {
        nodeNavMRV("testScenarios");
      }}
      navNodeBar={navNodeBarSTRX}
      showNavNodeBar={showNavNodeBar}
    ></TitleBarMRV>
  );
};

export { TitleBarSTRX };

/*

*/

const CashTotalSTRX = () => <CashTotalMRV mode={"returnMinusReplace"} />;

export { CashTotalSTRX };

const ReasonBadgeSTRX = ({ itemAtom }) => {
  // doing this as a Config since it's used in a couple places.
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const reasonRepo = sessionMRV.returnReasonsRepo;
  const itemReasonsQty = reasonRepo?.[itemAtom.atomItemNum]?.allReasonsQty();
  const mrvMethods = useCompHooks_MRV().oReasonPicker_SC();

  const sLabelStatus = mrvMethods.isReasonQtyValid({
    itemAtom: itemAtom,
    validCondition: "notOver",
  })
    ? "neutralGrey"
    : "badRed";

  return (
    <ReasonBadgeMRV itemAtom={itemAtom} sLabelStatus={sLabelStatus} />
  );
};

export { ReasonBadgeSTRX };
