import { dLocalCtx } from "../../../../../../../mrv_data_types";
import { cloneDeep } from "lodash";

function LwQualifiers({ oParentCtx }) {
  const refLs = dLocalCtx({});

  const parentLS = oParentCtx.oLocalState;
  const setParentLS = oParentCtx.fSetLocalState;

  const handleChipClick = (e, sChipKey, sLsKey) => {
    e.stopPropagation();
    const draftParentLS = cloneDeep(parentLS);
    draftParentLS[sLsKey] = sChipKey;
    setLs(draftParentLS);
  };

  const uiChip = ({ sChipKey, sLsKey }) => {
    const sIsActive = parentLS[sLsKey] === sChipKey ? "active" : "";
    return (
      <button
        key={sChipKey}
        onClick={(e) => handleChipClick(e, sChipKey, sLsKey)}
        className={`chip ${sIsActive}`}
      >
        {sChipKey}
      </button>
    );
  };

  return <div className={`vBox gap__1rem`}></div>;
}

export { LwConditions };
