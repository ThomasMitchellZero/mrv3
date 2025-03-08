import { baseStateExTurns, navNode } from "../../mrv_data_structures";

const baseStateCWEX = () => {
  const returnState = baseStateExTurns({
    oNavNodes: {
      itemCheck: navNode({
        keyStr: "itemCheck",
        sRoute: "/cwex/item-check",
        selected: true,
        disabled: false,
      }),
    },
  });
  return returnState;
};

export { baseStateCWEX };
