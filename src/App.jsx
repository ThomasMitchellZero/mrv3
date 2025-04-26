import { Route, Routes } from "react-router-dom";

// Global
import Main from "./legacy/Main";
import Placeholder from "./Sections/Placeholder/Placeholder";
import "./App.css";

//CWEX
import { CWEX } from "./MRV/apps/CWEX/CWEX_index";
import { StartCWEX } from "./MRV/apps/CWEX/nodes/1000_StartCEWX/StartCWEX";
import { ExchEntry } from "./MRV/apps/CWEX/nodes/1200_ExchEntry/ExchEntry";
import { ItemCheck } from "./MRV/apps/CWEX/nodes/1500_ItemCheck/ItemCheck";
import { ReturnPhase } from "./MRV/apps/CWEX/nodes/2000_ReturnPhase/ReturnPhase";
import { ReturnRejects } from "./MRV/apps/CWEX/nodes/2200_ReturnRejects/ReturnRejects";
import { NewItemsPhase } from "./MRV/apps/CWEX/nodes/3000_NewItemsPhase/NewItemsPhase";

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
            <Route path="exch-entry" element={<ExchEntry />} />
            <Route path="item-check" element={<ItemCheck />} />
            <Route path="return-phase" element={<ReturnPhase />} />
            <Route path="return-rejects" element={<ReturnRejects />} />
            <Route path="new-items-phase" element={<NewItemsPhase />} />
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
