import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";
import { LS_STRX_100_AddItemsAndInvos } from "../../_resources/components/CompLocStates_STRX";

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
    titleStr: "Returns",
    breadcrumb: true,
    routeStr: "/store-exchanges/choose-items-invos",
    locSt: LS_STRX_100_AddItemsAndInvos,
  }),
  reason: navNode({
    keyStr: "reason",
    titleStr: "Reason",
    breadcrumb: true,
    routeStr: "/store-exchanges/reason",
  }),
  replacements: navNode({
    keyStr: "replacements",
    titleStr: "Replacements",
    breadcrumb: true,
    routeStr: "/store-exchanges/replacements",
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
