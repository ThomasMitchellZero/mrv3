import { baseStateExTurns, navNode } from "../../../mrv_data_types";
import { useOutletContext } from "react-router-dom";
import { HeaderMRV } from "../../../components/layout/header/HeaderMRV";

const baseStateCWEX = () => {
  const returnState = baseStateExTurns({
    oNavNodes: {
      startCWEX: navNode({
        keyStr: "startCWEX",
        sRoute: "/cwex",
        sTitle: "Start",
      }),
      itemCheck: navNode({
        keyStr: "itemCheck",
        sRoute: "/cwex/item-check",
        sTitle: "Item Check",
      }),
      exchEntry: navNode({
        keyStr: "exchEntry",
        sRoute: "/cwex/exch-entry",
        sTitle: "Exchange Entry",
      }),
      returnPhase: navNode({
        keyStr: "returnPhase",
        sRoute: "/cwex/return-phase",
        sTitle: "Return Items",
        hasBreadcrumb: true,
      }),
      newItemPhase: navNode({
        keyStr: "newItemPhase",
        sRoute: "/cwex/new-item-phase",
        sTitle: "New Items",
        hasBreadcrumb: true,
      }),
    },
  });
  return returnState;
};

export { baseStateCWEX };
