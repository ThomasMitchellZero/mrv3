import { useOutletContext } from "react-router-dom";
import { useNodeNav } from "../../../../mrv_controller";

const StartCWEX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();

  return (
    <main className={`mrvPage`}>
      <div className={`mrvPanel__main `}>
        <h1>StartSTRX</h1>
        <div className={`vBox align__center`}>
          <button className={`primary`} onClick={() => nodeNav("itemCheck")}>
            CWEX Test 1
          </button>
        </div>

        <div className="testBox"></div>
        <div className="testBox redBox"></div>
        <div className="testBox redBox blueBox"></div>
      </div>
    </main>
  );
};

export { StartCWEX };
