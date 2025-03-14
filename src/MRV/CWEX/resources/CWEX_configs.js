import { baseStateExTurns, navNode } from "../../mrv_data_types";

const baseStateCWEX = () => {
  const returnState = baseStateExTurns({
    oNavNodes: {
      itemCheck: navNode({
        keyStr: "itemCheck",
        sRoute: "/cwex/item-check",
        sTitle: "Item Check",
        preloadSessionState: {Fartrell: "Cluggins"},
      }),
      returnPhase: navNode({
        keyStr: "returnPhase",
        sRoute: "/cwex/return-phase",
        sTitle: "Return Phase",
      }),
    },
  });
  return returnState;
};

export { baseStateCWEX };
