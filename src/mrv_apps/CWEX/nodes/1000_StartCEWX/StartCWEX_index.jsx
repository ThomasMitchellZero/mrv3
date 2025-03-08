import { useOutletContext } from "react-router-dom";
import { useNodeNav } from "../../../mrv_logic";
import { navNode } from "../../../mrv_data_structures";

const StartCWEX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();

  const refNavNode = navNode({});

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
