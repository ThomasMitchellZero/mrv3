import { useOutletContext } from "react-router-dom";
import { useNodeNav } from "../../../../mrv_controller";
import { HeaderMRV } from "../../../../components/layout/header/HeaderMRV";

const StartCWEX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();

  console.log(sessionMRV);
  console.log(sessionMRV.oNavNodes);

  return (
    <main className={`mrvPage`}>
      <div className={`mrvPanel__main `}>
        <HeaderMRV title={"Start Carry With Exchanges"}/>
        <div className={`body`}>
          <div className={`vBox align__center`}>
            <button className={`primary`} onClick={() => nodeNav("itemCheck")}>
              CWEX Test 1
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export { StartCWEX };
