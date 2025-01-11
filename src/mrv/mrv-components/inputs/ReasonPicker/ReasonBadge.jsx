// For STRX-specific configurations of stock MRV components

import { useOutletContext } from "react-router";
import { BigLabeledValue } from "../../DisplayOutputs/BigLabeledValue";

const ReasonBadgeMRV = ({ itemAtom, sLabelStatus = "meltdownMagenta"}) => {

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const reasonRepo = sessionMRV.returnReasonsRepo;
  const itemReasonsQty = reasonRepo?.[itemAtom.atomItemNum]?.allReasonsQty();


  return (
    <BigLabeledValue
      status={`${sLabelStatus}`}
      labelStr="Reasons"
      invertColors={true}
      valueStr={`${itemReasonsQty} / ${itemAtom.atomItemQty}`}
      size="S"
    />
  );
};

export { ReasonBadgeMRV };
