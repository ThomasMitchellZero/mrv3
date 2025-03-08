import { useOutletContext } from "react-router-dom";

const StartCWEX = () => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const testStatus = sessionMRV.test;

  return (
    <main>
      <h1>StartSTRX</h1>
      <button onClick={() => setSessionMRV({ ...sessionMRV, test: !testStatus })}>
        Test
      </button>
    </main>
  );
};

export { StartCWEX };
