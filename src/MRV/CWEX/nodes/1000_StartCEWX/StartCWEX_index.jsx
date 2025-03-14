import { useOutletContext } from "react-router-dom";
import { useNodeNav } from "../../../mrv_controller";


const StartCWEX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();


  return (
    <main>
      <h1>StartSTRX</h1>
      <button onClick={() => nodeNav("itemCheck")}>
        Test
      </button>
    </main>
  );
};

export { StartCWEX };
