import "./_ReasonPickerStyle.css";

import { useResetLocStFields } from "../../../MRVhooks/MRVhooks";

import { useCompHooks_MRV } from "../../CompHooksMRV";

import {
  itemReturnReasons,
  oReturnReason,
  returnAtom,
} from "../../../../globalFunctions/globalJS_classes";

import { useOutletContext } from "react-router";
import { useContext } from "react";

function ReasonPickerSC_MRV({}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const locMethods = useCompHooks_MRV({}).oReasonPicker_SC;

  // state routes shortcuts
  const locStRt = sessionMRV.locSt;
  const activeItem = locStRt.page.activeData1;
  const activeItemKey = activeItem.atomItemNum;
  const localMode = locStRt.ReasonPickerSC.activeMode1;
  const activeItemReasons =
    sessionMRV.returnReasonsRepo?.[activeItemKey]?.oAllItemReasons;

  console.log("activeItemReasons", activeItemReasons);

  // arrays for the two types of reasons.

  const aItemOKreasons = Object.values(activeItemReasons).filter(
    (thisReason) => {
      return thisReason.isDefective === false;
    }
  );

  const aItemDefectiveReasons = Object.values(activeItemReasons).filter(
    (thisReason) => {
      return thisReason.isDefective === true;
    }
  );

  const oMode = {
    ItemOK: {
      label: "Item OK",
      instruction: "Select return reason.",
      chips: aItemOKreasons.map((thisReason) => {
        return (
          <button key={thisReason.keyStr} className={`chip`} onClick={() => {}}>
            {thisReason.strLabel}
          </button>
        );
      }),
    },
    Defective: {
      label: "Defective",
      instruction: "Select condition and enter qty.",
    },
  };

  ///////////////////////////////////////////////////////////////////
  ////////////   UI Tab Elements   //////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  console.log("aItemOKreasons", aItemOKreasons);

  const refAtom = new returnAtom({});
  const refItemReasons = itemReturnReasons({});
  const refOSingleReason = oReturnReason({});

  const handleTabClick = (btnKey) => {
    locMethods.modeSwitch({ keyStr: btnKey });
  };

  const uiReasonTab = (btnKey = "NO TITLE") => {
    const isTabActive = localMode === btnKey ? "active" : "";
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          handleTabClick(btnKey);
        }}
        className={`tab ${isTabActive} `}
      >
        {`${oMode[btnKey].label}`}
      </button>
    );
  };

  const uiNavCluster = (
    <div className={`navCluster`}>
      {uiReasonTab(`ItemOK`)}
      {uiReasonTab(`Defective`)}
    </div>
  );

  ///////////////////////////////////////////////////////////////////
  ////////////   UI Chip Elements   /////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  oMode.ItemOK.chips = aItemOKreasons.map((thisReason) => {
    return (
      <button key={thisReason.keyStr} className={`chip`} onClick={() => {}}>
        {thisReason.strLabel}
      </button>
    );
  });

  oMode.Defective.chips = aItemDefectiveReasons.map((thisReason) => {
    return (
      <button key={thisReason.keyStr} className={`chip`} onClick={() => {}}>
        {thisReason.strLabel}
      </button>
    );
  });
  // Final Render /////////////////////////////////////////////////

  return (
    <div className={`reasonPicker`}>
      {uiNavCluster}
      <div className={`chipCluster`}>
        <div className={`body color__tertiary__text instruction`}>
          {oMode[localMode].instruction}
        </div>
        <div className={`chipCtnr`}>{oMode[localMode].chips}</div>
      </div>
    </div>
  );
}

export { ReasonPickerSC_MRV };
