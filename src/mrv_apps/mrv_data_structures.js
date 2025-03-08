import { cloneDeep } from "lodash";
import { useNavigate } from "react-router";

function navNode({
  keyStr = "",
  sRoute = "",
  sTitle = "No Title",
  selected = false,
  hasBreadcrumb = false,
  disabled = true,
  preloadSessionState = {}, // wondering if this should be a function?
}) {
  return {
    keyStr,
    sRoute,
    sTitle,
    selected,
    hasBreadcrumb,
    disabled,
    preloadSessionState,
  };
}

export { navNode };

function baseStateExTurns({
  oNavNodes = {},
  returnItems = {},
  sessionInvos = {},
  returnReasons = {},
  newItems = {},
}) {
  return {
    oNavNodes,
    returnItems,
    sessionInvos,
    returnReasons,
    newItems,
  };
}

export { baseStateExTurns };
