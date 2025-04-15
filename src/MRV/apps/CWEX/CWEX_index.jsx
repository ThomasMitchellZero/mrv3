import { useState } from "react";
import "../../mrv_style.css";
import { baseStateCWEX } from "./resources/CWEX_configs";
import { useAutoDeriver } from "../../mrv_controller";
import { dProduct, dSaleRecord } from "../../mrv_data_types";

import { Outlet } from "react-router";

function CWEX() {
  const [sessionMRV, setSessionMRV] = useState(baseStateCWEX());
  const fAutoDeriver = useAutoDeriver(sessionMRV);
  const oDerived = fAutoDeriver();

  return (
    <main className={`mrv3 cwex`}>
      <Outlet
        context={{
          sessionMRV,
          setSessionMRV,
          oDerived: oDerived,
        }}
      />
    </main>
  );
}

export { CWEX };

/*


*/
