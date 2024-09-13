import "./NavNodeBarMRV.css";
import { MdChevronRight } from "react-icons/md";

import {
  navNode,
  baseReturnState,
} from "../../../globalFunctions/globalJS_classes";
import { useNodeNav } from "../../MRVhooks/MRVhooks";

const NavNodeBarMRV = ({ sessionState, setSessionState }) => {
  const nodeNav = useNodeNav({
    sessionState: sessionState,
    setSessionState: setSessionState,
  });

  const sessionNavNodes = sessionState.oNavNodes;
  const refDefaultState = baseReturnState({});

  // only use the nodes with a breadcrumb property.
  const aBreadCrumbNodes = Object.values(sessionNavNodes).filter(
    (node) => node.breadcrumb
  );

  const uiBreadcrumb = (crumbNavNodes) => {
    const refNavNode = navNode({});
    const selected = crumbNavNodes.selected ? "selected" : "";
    const disabled = crumbNavNodes.disabled ? "disabled nohover" : "";
    const sConfig = crumbNavNodes.disabled
      ? "disabled"
      : crumbNavNodes.selected
      ? "selected"
      : "past";

    const oConfigs = {
      past: {
        class: "",
        action: () => {
          nodeNav(crumbNavNodes.keyStr);
        },
      },
      selected: {
        class: "selected nohover",
        action: () => {},
      },
      disabled: {
        class: "disabled nohover",
        action: () => {},
      },
    };

    return (
      <button
        key={crumbNavNodes.keyStr}
        onClick={() => {
          oConfigs[sConfig].action();
        }}
        className={`ghost miniBtn ${oConfigs[sConfig].class}`}
      >
        {crumbNavNodes.titleStr}
        <MdChevronRight />
      </button>
    );
  };

  return (
    <section className={`navNodeBar`}>
      {aBreadCrumbNodes.map((node) => {
        return uiBreadcrumb(node);
      })}
    </section>
  );
};

export { NavNodeBarMRV };
