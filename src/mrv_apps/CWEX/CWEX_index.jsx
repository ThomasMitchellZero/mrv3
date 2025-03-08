import { useState } from "react";
import "../mrv_style.css";
import { baseStateCWEX } from "./resources/CWEX_configs";

import { Outlet } from "react-router";

function CWEX() {
  const [sessionMRV, setSessionMRV] = useState(baseStateCWEX());

  return (
    <main className={`mrv_style`}>
      <Outlet
        context={{
          sessionMRV,
          setSessionMRV,
        }}
      />
    </main>
  );
}

export { CWEX };

function StoreExchanges() {
  const [sessionMRV, setSessionMRV] = useImmer(baseStateSTRX());

  return (
    <section className={`mrv STRX_top`}>
      <Outlet
        context={{
          sessionMRV,
          setSessionMRV,
        }}
      />
    </section>
  );
}

export { StoreExchanges };

/*


*/
