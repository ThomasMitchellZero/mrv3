import "./_ReasonPickerStyle.css";

import { MdOutlineAdd, MdMinimize } from "react-icons/md";

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
  const activeSingleReason = locStRt.ReasonPickerSC.activeData1;

  // arrays for the two types of reasons.

  const oMode = {
    ItemOK: {
      label: "Item OK",
      instruction: "Select return reason.",
      chips: [],
      inputs: null,
    },
    Defective: {
      label: "Defective",
      instruction: "Select condition and enter qty.",
      chips: [],
      inputs: null,
    },
  };

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

  ///////////////////////////////////////////////////////////////////
  ////////////   UI Tab Elements   //////////////////////////////////
  ///////////////////////////////////////////////////////////////////

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

  // Item OK Chips

  const okClick = (oReason) => {
    setSessionMRV((draft) => {
      let okRsn =
        draft.returnReasonsRepo[activeItemKey].oAllItemReasons[oReason.keyStr];
      okRsn.isChosen = !okRsn.isChosen;
    });
  };

  oMode.ItemOK.chips = aItemOKreasons.map((thisReason) => {
    const isChosen = thisReason.isChosen ? "active" : "";
    return (
      <button
        key={thisReason.keyStr}
        className={`chip ${isChosen}`}
        onClick={() => {
          okClick(thisReason);
        }}
      >
        {thisReason.strLabel}
      </button>
    );
  });

  // Defective Chips

  const defectiveClick = (oReason) => {
    const refOReturnReason = oReturnReason({});
    setSessionMRV((draft) => {
      draft.locSt.ReasonPickerSC.activeKey1 = oReason.keyStr;
    });
  };

  oMode.Defective.chips = aItemDefectiveReasons.map((thisReason) => {
    // Checks if the chip keyStr is the same as the activeData1 keyStr
    const isSelected = locStRt.ReasonPickerSC.activeKey1 === thisReason.keyStr;
    // if the reasonQty is greater than 0, the chip is active
    const chipQty = thisReason.reasonQty;

    const chipClass = isSelected ? "selected" : chipQty ? "active" : "";

    const labelStr = chipQty
      ? `${thisReason.strLabel} : ${chipQty}`
      : `${thisReason.strLabel}`;
    return (
      <button
        key={thisReason.keyStr}
        className={`chip ${chipClass}`}
        onClick={() => {
          defectiveClick(thisReason);
        }}
      >
        {labelStr}
      </button>
    );
  });

  ///////////////////////////////////////////////////////////////////
  ////////////   UI Input Cluster    /////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  // function to handle inputs from the plus and minus buttons

  // button template for plus and minus
  const uiPlusMinBtn = ({ plus = true }) => {
    return (
      <button
        className={`plusMinBtn heading__large regular secondary`}
        onClick={() => {
          console.log("isPlus", plus);
          locMethods.handlePlusMinus({ plus: plus });
        }}
      >
        {plus ? "+" : "-"}
      </button>
    );
  };

  // start here tomorrow.
  oMode.Defective.inputs = (
    <div className={`inputCluster`}>
      {uiPlusMinBtn({ plus: false })}
      {uiPlusMinBtn({ plus: true })}
    </div>
  );

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
      {oMode[localMode].inputs}
    </div>
  );
}

export { ReasonPickerSC_MRV };
