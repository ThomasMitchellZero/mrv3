import "./_ReasonPickerStyle.css";

import { MRVinput } from "../MRVinput";

import { useResetLocStFields, useFindAtom } from "../../../MRVhooks/MRVhooks";

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
  const findAtom = useFindAtom();

  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const rsnRepoRt = sessionMRV.returnReasonsRepo;

  const locMethods = useCompHooks_MRV({}).oReasonPicker_SC;

  // state routes shortcuts
  const locStRt = sessionMRV.locSt;

  const activeItemKey = locStRt.page.activeKey1;
  const activeItemAtom = findAtom({ itemNum: activeItemKey, asIndex: false });
  const localMode = locStRt.ReasonPickerSC.activeMode1;
  const activeItemReasons = rsnRepoRt?.[activeItemKey];
  const RepoItemReasons = activeItemReasons?.oAllItemReasons;
  const activeReasonKey = locStRt.ReasonPickerSC.activeKey1;
  const oActiveReason = RepoItemReasons?.[activeReasonKey];

  console.log("activeItemReasons", activeItemReasons.okReasonsQty());
  activeItemReasons?.okReasonsQty();

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

  const tabMode = {
    ItemOK: {
      onClick: () => {},
      tabQty: 0,
    },
    Defective: {
      onClick: () => {},
      tabQty: 0,
    },
  };

  const aItemOKreasons = Object.values(RepoItemReasons).filter((thisReason) => {
    return thisReason.isDefective === false;
  });

  const aItemDefectiveReasons = Object.values(RepoItemReasons).filter(
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
    const tabMode = {
      ItemOK: {
        tabQty: `${activeItemReasons?.okReasonsQty()}`,
      },
      Defective: {
        tabQty: `${activeItemReasons?.allReasonsQty()}`,
      },
    };
    const isTabActive = localMode === btnKey ? "active" : "";

    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          handleTabClick(btnKey);
        }}
        className={`tab ${isTabActive} `}
      >
        {`${oMode[btnKey].label}: ${tabMode[btnKey].tabQty}`}
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

  oMode.ItemOK.chips = aItemOKreasons.map((oReason) => {
    const isChosen = oReason.isChosen ? "active" : "";
    return (
      <button
        key={oReason.keyStr}
        className={`chip ${isChosen}`}
        onClick={() => {
          okClick(oReason);
        }}
      >
        {oReason.strLabel}
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

  oMode.Defective.chips = aItemDefectiveReasons.map((oReason) => {
    const refOReturnReason = oReturnReason({});
    // Checks if the chip keyStr is the same as the activeData1 keyStr
    const isSelected = activeReasonKey === oReason.keyStr;
    // if the reasonQty is greater than 0, the chip is active
    const chipQty = oReason.reasonQty;

    const chipClass = isSelected ? "selected" : chipQty ? "active" : "";

    const labelStr = chipQty
      ? `${oReason.strLabel} : ${chipQty}`
      : `${oReason.strLabel}`;
    return (
      <button
        key={oReason.keyStr}
        className={`chip ${chipClass}`}
        onClick={() => {
          defectiveClick(oReason);
        }}
      >
        {labelStr}
      </button>
    );
  });

  ///////////////////////////////////////////////////////////////////
  ////////////   UI Input Cluster    /////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  // button template for plus and minus
  const uiPlusMinBtn = ({ plus = true }) => {
    return (
      <button
        className={`plusMinBtn heading__large regular ghost`}
        disabled={!activeReasonKey}
        onClick={() => {
          console.log("isPlus", plus);
          locMethods.handlePlusMinus({ plus: plus });
        }}
      >
        {plus ? "+" : "-"}
      </button>
    );
  };

  const handleInactiveCluster = (e) => {
    e.stopPropagation();
    console.log("Inactive Cluster");
    if (!activeReasonKey) locMethods.setError({ errorKey: "noReasonPicked" });
  };

  // start here tomorrow.
  oMode.Defective.inputs = (
    <div onClick={(e) => handleInactiveCluster(e)} className={`inputCluster`}>
      {uiPlusMinBtn({ plus: false })}
      <MRVinput width={"5rem"}>
        <input
          type="number"
          min={0}
          disabled={!activeReasonKey}
          onChange={(e) => {
            locMethods.setReasonRepoQty({ newQty: e.target.value });
          }}
          value={oActiveReason?.reasonQty || ""}
        ></input>
      </MRVinput>
      {uiPlusMinBtn({ plus: true })}
    </div>
  );

  const uiInputError = locStRt.ReasonPickerSC.activeError1?.str ? (
    <div className={`warning tinyText`}>
      {locStRt.ReasonPickerSC.activeError1.str}
    </div>
  ) : null;

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
      {uiInputError}
    </div>
  );
}

export { ReasonPickerSC_MRV };
