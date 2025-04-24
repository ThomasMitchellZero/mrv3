import "./RejectionMRV.css";

import { useOutletContext } from "react-router-dom";

function RejectionMRV() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const oDerived = mrvCtx.oDerived;

  return (
    <div className={`mrvPanel__main cart-rejection`}>
      <div className={`body`}>Fire Ze Rejectatron!</div>
    </div>
  );
}

export { RejectionMRV };
