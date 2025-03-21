import { baseStateExTurns, navNode } from "../../../mrv_data_types";
import { useOutletContext } from "react-router-dom";


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
        sTitle: "Return Phase",
        hasBreadcrumb: true,
      }),
    },
  });
  return returnState;
};

export { baseStateCWEX };

/////////////////////////////////////////////
// Component Configs
/////////////////////////////////////////////


