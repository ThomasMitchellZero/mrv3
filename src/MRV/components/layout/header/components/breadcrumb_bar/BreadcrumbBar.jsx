import "./BreadcrumbBar_style.css";
import { navNode } from "../../../../../mrv_data_types";
import { MdChevronRight } from "react-icons/md";

function BreadcrumbBar({oNavNodes = {}}) {
  const refNavNode = navNode({});

  const uiNode = (oThisNode) => {
    const oStatus = oThisNode.isCurrent
      ? "current"
      : oThisNode.isActive
      ? "active"
      : "inactive";

    return (
      <button className={`nodeBtn ${oStatus}`}>
        {oThisNode.sTitle}
        <MdChevronRight size={`1.25rem`} />
      </button>
    );
  };

  console.log(oNavNodes);

  const aNavNodes = Object.values(oNavNodes);
  console.log(aNavNodes);
  const aBreadcrumbNodes = aNavNodes.filter(
    (oNavNode) => oNavNode.hasBreadcrumb
  );
  const uiNodes = aBreadcrumbNodes.map((oNavNode) => {
    console.log(oNavNode.sTitle);
    return uiNode(oNavNode);
  });

  return <div className={`hBox breadcrumbBar gap__05rem`}>{uiNodes}</div>;
}

export { BreadcrumbBar };
