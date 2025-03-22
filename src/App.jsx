import { Route, Routes } from "react-router-dom";

// Global
import Main from "./legacy/Main";
import Placeholder from "./Sections/Placeholder/Placeholder";
import "./App.css";

//CWEX
import { CWEX } from "./MRV/apps/CWEX/CWEX_index";
import { StartCWEX } from "./MRV/apps/CWEX/nodes/1000_StartCEWX/StartCWEX";
import { ItemCheck } from "./MRV/apps/CWEX/nodes/1500_ItemCheck/ItemCheck";
import { ReturnPhase } from "./MRV/apps/CWEX/nodes/2000_ReturnPhase/ReturnPhase";

///////////// Deprecate all these once no longer needed ////////////////

//Store Exchanges

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Placeholder titleText="Home" />} />
          <Route path="home" element={<Placeholder titleText="Home" />} />
          <Route path="returns" element={<Placeholder titleText="Returns" />} />
          <Route
            path="exchanges"
            element={<Placeholder titleText="Exchanges" />}
          />

          {/* CWEX */}
          <Route path="cwex" element={<CWEX />}>
            <Route index element={<StartCWEX />} />
            <Route path="item-check" element={<ItemCheck />} />
            <Route path="return-phase" element={<ReturnPhase />} />
          </Route>
          <Route path="test" element={<Placeholder titleText="Tests" />} />
        </Route>
      </Routes>
    </div>
  );
}

/*





*/

export default App;
