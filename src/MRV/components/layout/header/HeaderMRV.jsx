import "./HeaderMRV.css";
import { useOutletContext } from "react-router-dom";

import { navNode } from "../../../mrv_data_types";
import { MdArrowBack, MdChevronLeft } from "react-icons/md";
import { BreadcrumbBar } from "./components/breadcrumb_bar/BreadcrumbBar";

/**
 * HeaderMRV component
 *
 * @param {string} [title="NO TITLE"] - The title to display in the header
 * @param {Object|null} [oCustomNavNodes=null] - Replaces default session nav nodes (rarely used)
 * @returns {JSX.Element} The rendered header component
 */

function HeaderMRV({ title = "NO TITLE", oCustomNavNodes = null }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const oHeaderNodes = oCustomNavNodes || sessionMRV.oNavNodes;

  const refNavNode = navNode({});

  console.log(oHeaderNodes);

  return (
    <header className={`header header__mrv`}>
      <div className={`vBox color__primary__text heading__large gap__05rem`}>
        <BreadcrumbBar oNavNodes={oHeaderNodes} />
        <div className={`hBox color__primary__text heading__large gap__05rem`}>
          {title}
        </div>
      </div>
    </header>
  );
}

export { HeaderMRV };
