import { baseStateExTurns, navNode } from "../../../mrv_data_types";
import { useOutletContext } from "react-router-dom";
import { HeaderMRV } from "../../../components/layout/header/HeaderMRV";

const baseStateCWEX = () => {
  const returnState = baseStateExTurns({
    oNavNodes: {
      itemCheck: navNode({
        keyStr: "itemCheck",
        sRoute: "/cwex/item-check",
        sTitle: "Item Check",
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
