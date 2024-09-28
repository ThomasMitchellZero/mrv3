import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";
import { LS_STRX_100_AddItemsAndInvos } from "../../_resources/components/CompLocStates_STRX";
import { LS_STRX_300_NewItems } from "../../_resources/components/CompLocStates_STRX";

import {
  ProdClass,
  InvoProduct,
  navNode,
  baseReturnState,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useSetSessionItems,
  useSetSessionInvos,
  useNodeNav,
} from "../../../../mrv/MRVhooks/MRVhooks";

const defaultNavNodesSTRX = {
  testScenarios: navNode({
    keyStr: "testScenarios",
    titleStr: "Start",
    routeStr: "/store-exchanges",
  }),
  replacementCheck: navNode({
    keyStr: "replacementCheck",
    titleStr: "Replacement Check",
    routeStr: "/store-exchanges/replacement-check",
  }),
  returns: navNode({
    keyStr: "returns",
    titleStr: "Receipts & Returns",
    breadcrumb: true,
    routeStr: "/store-exchanges/choose-items-invos",
    locSt: LS_STRX_100_AddItemsAndInvos,
  }),
  nrrRejection: navNode({
    keyStr: "nrrRejection",
    titleStr: "Missing Receipts",
    routeStr: "/store-exchanges/no-receipt",
  }),
  newitems: navNode({
    keyStr: "newitems",
    titleStr: "New Items",
    breadcrumb: true,
    routeStr: "/store-exchanges/newitems",
    locSt: LS_STRX_300_NewItems,
  }),
  unpaired: navNode({
    keyStr: "unpaired",
    titleStr: "Unpaired Items",
    routeStr: "/store-exchanges/unpaired",
  }),
  review: navNode({
    keyStr: "review",
    titleStr: "Review",
    breadcrumb: true,
    routeStr: "/store-exchanges/review",
  }),
};

console.log("defaultNavNodesSTRX", defaultNavNodesSTRX.returns.locSt);

const baseStateSTRX = () => {
  // the basic state for Exchanges app.  Will need whenever we full-reset the app.
  return baseReturnState({ oNavNodes: defaultNavNodesSTRX });
};

export { baseStateSTRX };
