import "./App.css";
import "./app-styles/table.css";
import "./app-styles/buttons.css";
import "./app-styles/text-styles.css";
import "./app-styles/inputs.css";
import "./app-styles/dividers.css";
import "./app-styles/panels.css";
import "./app-styles/system-colors.css";
import "./app-styles/footer-styles.css";
import "./app-styles/drop-shadows.css";
import "./app-styles/scrim.css";

import { Route, Routes } from "react-router-dom";

// Global
import Main from "./components/UI/PageLayout/Main";
import Placeholder from "./Sections/Placeholder/Placeholder";

//CWEX
import { CWEX } from "./mrv_apps/CWEX/CWEX_index";
import { StartCWEX } from "./mrv_apps/CWEX/nodes/1000_StartCEWX/StartCWEX_index";

///////////// Deprecate all these once no longer needed ////////////////

// Returns
import Returns from "./Sections/Returns/Returns";
import ReturnsIndex from "./Sections/Returns/Index/ReturnsIndex";
import FullItemReview from "./Sections/Returns/Review/FullItemReview";
import ReceiptLookup from "./Sections/Returns/Receipt_Lookup/ReceiptLookup";
import TotalReview from "./Sections/Returns/Total_Review/TotalReview";
import DeclineSlip from "./Sections/Returns/DeclineSlip/DeclineSlip";
import FinalizeRefund from "./Sections/Returns/Finalize_Refund/FinalizeRefund";
import SelectReceiptType from "./Sections/Returns/Select_Receipt/SelectReceiptType";

// Exchanges
import Exchanges from "./Sections/Exchanges/Exchanges";
import { ExchStartExchange } from "./Sections/Exchanges/_pages/10_StartExchange/StartExchange";
import { ExchChooseExchItems } from "./Sections/Exchanges/_pages/20_ChooseExchangeItems/ChooseExchangeItems";
import { ExchReason } from "./Sections/Exchanges/_pages/30_ExchReason/ExchReason";
import { ReplacementItems } from "./Sections/Exchanges/_pages/40_ExchReplacements/ReplacementItems";
import { ExchScheduleTimes } from "./Sections/Exchanges/_pages/50_ScheduleTimes/ScheduleTimes";
import { ExchTotalReview } from "./Sections/Exchanges/_pages/60_TotalReview/TotalReview";
import { ExchReceiptPage } from "./Sections/Exchanges/_pages/70_ReceiptPage/ReceiptPage";

//STRX

import { ReplacementCheck } from "./Sections/StoreExchanges/_pages/150_ItemCheck/ReplacementCheck";
import { AddItemsAndInvosSTRX } from "./Sections/StoreExchanges/_pages/200_AddItemsAndInvoices/AddItemsAndInvosSTRX";
import { NewItems } from "./Sections/StoreExchanges/_pages/300_L4LnewItems/NewItems";
import { ReturnRejection } from "./Sections/StoreExchanges/_pages/275_ReturnRejection/ReturnRejection";
import { UnpairedRejection } from "./Sections/StoreExchanges/_pages/375_UnpairedRejection/UnpairedRejection";
import { TotalReviewSTRX } from "./Sections/StoreExchanges/_pages/500_TotalReview/TotalReviewSTRX";

//XDTX
import { XDTX } from "./Sections/XDTX/XDTX";
import { StartXDTX } from "./Sections/XDTX/_pages/100_Start_XTDX/StartXDTX";
import { ReturnItemsXDTX } from "./Sections/XDTX/_pages/150_ReturnItems/ReturnItemsXDTX";
import { ReturnReasonXDTX } from "./Sections/XDTX/_pages/200_ReturnReason/ReturnReasonXDTX";
import { ReplacementItemsXDTX } from "./Sections/XDTX/_pages/250_ReplacementItems/ReplacementItemsXDTX";
import { ScheduleDeliveryXDTX } from "./Sections/XDTX/_pages/300_ScheduleDelivery/ScheduleDeliveryXDTX";
import { TotalReviewXDTX } from "./Sections/XDTX/_pages/350_TotalReview/TotalReviewXDTX";

import { TestIndex } from "./Sections/Testing/TestIndex";
import { MultiReasonMain } from "./Sections/Testing/T_Sections/MultiReason/_pages/MultiReasonMain";

//Store Exchanges

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Placeholder titleText="Home" />} />
          <Route path="home" element={<Placeholder titleText="Home" />} />
          <Route path="orders" element={<Placeholder titleText="Orders" />} />
          <Route path="returns" element={<Returns />}>
            <Route index element={<ReturnsIndex></ReturnsIndex>} />
            <Route
              path="first-review"
              element={<FullItemReview pageStatus="preSearch" />}
            />
            <Route path="receipt-lookup" element={<ReceiptLookup />} />
            <Route
              path="unmatched-review"
              element={<FullItemReview pageStatus="postSearch" />}
            />
            <Route path="decline-slip" element={<DeclineSlip />} />
            <Route path="total-review" element={<TotalReview />} />
            <Route path="finalize-refund" element={<FinalizeRefund />} />
            <Route path="receipt" element={<SelectReceiptType />} />
            <Route path="multiple-reasons" element={<SelectReceiptType />} />
            <Route
              path="test-complete"
              element={
                <Placeholder
                  titleText="Input Test"
                  pageText="Input Test Complete.  Just a few more questions!"
                />
              }
            />
          </Route>
          <Route path="exchanges" element={<Exchanges />}>
            <Route index element={<ExchStartExchange />} />
            <Route path="chooseitems" element={<ExchChooseExchItems />} />
            <Route path="exchreason" element={<ExchReason />} />
            <Route path="whichforwhat" element={<ReplacementItems />} />
            <Route path="schedule" element={<ExchScheduleTimes />} />
            <Route path="totalreview" element={<ExchTotalReview />} />
            <Route path="receipt" element={<ExchReceiptPage />} />
          </Route>
          {/* CWEX */}
          <Route path="cwex" element={<CWEX />}>
            <Route index element={<StartCWEX />} />
            <Route path="replacement-check" element={<ReplacementCheck />} />
            <Route
              path="choose-items-invos"
              element={<AddItemsAndInvosSTRX />}
            />
            <Route path="return-rejection" element={<ReturnRejection />} />
            <Route path="newitems" element={<NewItems />} />
            <Route path="unpaired" element={<UnpairedRejection />} />
            <Route path="total-review" element={<TotalReviewSTRX />} />
          </Route>
          <Route path="xdt-exchanges" element={<XDTX />}>
            <Route index element={<StartXDTX />} />
            <Route path="return-items" element={<ReturnItemsXDTX />} />
            <Route path="return-reason" element={<ReturnReasonXDTX />} />
            <Route
              path="replacement-items"
              element={<ReplacementItemsXDTX />}
            />
            <Route
              path="schedule-delivery"
              element={<ScheduleDeliveryXDTX />}
            />
            <Route path="total-review" element={<TotalReviewXDTX />} />
          </Route>
          <Route path="test">
            <Route index element={<TestIndex />} />
            <Route
              path="multi-reason-t1"
              element={<MultiReasonMain tMode="T1" />}
            />
            <Route
              path="multi-reason-t2"
              element={<MultiReasonMain tMode="T2" />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

/*





*/

export default App;
