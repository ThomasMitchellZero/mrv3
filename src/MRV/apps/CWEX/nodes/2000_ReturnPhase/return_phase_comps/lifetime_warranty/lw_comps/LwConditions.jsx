import { dLocalCtx } from "../../../../../../../mrv_data_types";

function LwQualifierBox({ lsKey = "", prntLocalContext, bIsValid, sInvalidMsg, isVisible }) {
  const refLs = dLocalCtx({})
  

  const handleChipClick = (e) => {
    e.stopPropagation();
    const draftPrntLS = refLs;
    draftPrntLS[lsKey] = e.target.value;
    setLs(draft);
  };

  return <div className={`vBox gap__1rem`}></div>;
}

export { LwConditions };
