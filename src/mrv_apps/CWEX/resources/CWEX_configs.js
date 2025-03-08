import { baseStateExTurns, navNode } from "../../mrv_data_structures";

const baseStateCWEX = () => {
  const returnState = baseStateExTurns({
    oNavNodes: {
      itemCheck: navNode({
        keyStr: "itemCheck",
        sRoute: "/cwex/item-check",
        sTitle: "Item Check",
        preloadSessionState: {Fartrell: "Cluggins"},
      }),
    },
  });
  return returnState;
};

export { baseStateCWEX };
