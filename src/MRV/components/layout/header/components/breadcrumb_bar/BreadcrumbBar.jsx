import "./BreadcrumbBar_style.css";
import { navNode } from "../../../../../mrv_data_types";
import { MdChevronRight } from "react-icons/md";
import { useNodeNav } from "../../../../../mrv_controller";

function BreadcrumbBar({ sAppName = "", oNavNodes = {} }) {
  const refNavNode = navNode({});
  const nodeNav = useNodeNav();

  const uiNode = (oThisNode) => {
    const sStatus = oThisNode.isCurrent
      ? "current"
      : oThisNode.isActive
      ? "active"
      : "inactive";

    return (
      <button
        key={oThisNode.keyStr}
        className={`crumbBtn body__small ${sStatus}`}
        onClick={() => {
          if (oThisNode.isActive) {
            nodeNav(oThisNode.keyStr);
          }
        }}
      >
        <MdChevronRight size={`1.25rem`} />
        {oThisNode.sTitle}
      </button>
    );
  };

  // convert NavNodes to an array and filter for nodes that get breadcrumbs
  const aNavNodes = Object.values(oNavNodes);
  const aBreadcrumbNodes = aNavNodes.filter(
    (oNavNode) => oNavNode.hasBreadcrumb
  );
  const uiNodes = aBreadcrumbNodes.map((oNavNode) => {
    return uiNode(oNavNode);
  });

  // Add the app name to the breadcrumb bar if it exists.
  if (sAppName) {
    uiNodes.unshift(
      <div
        key={`appTitle`}
        className={`body__small color__secondary__text bold`}
      >
        {sAppName}
      </div>
    );
  }

  return <div className={`hBox breadcrumbBar gap__05rem`}>{uiNodes}</div>;
}

export { BreadcrumbBar };
