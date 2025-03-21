import "./HeaderMRV.css";
import { useOutletContext } from "react-router-dom";

import { navNode } from "../../../mrv_data_types";
import { MdArrowBack, MdChevronLeft } from "react-icons/md";
import { BreadcrumbBar } from "./components/breadcrumb_bar/BreadcrumbBar";

/**
 * HeaderMRV component
 *
 * @param {string} [sAppName="NO APP NAME"] - The name of the app
 * @param {string} [sPageTitle="NO TITLE"] - The title to display in the header
 * @param {Object|null} [oCustomNavNodes=null] - Replaces default session nav nodes (rarely used)
 * @returns {JSX.Element} The rendered header component
 */

function HeaderMRV({
  sAppName = "NO APP NAME",
  sPageTitle = "NO TITLE",
  oCustomNavNodes = null,
}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const oHeaderNodes = oCustomNavNodes || sessionMRV.oNavNodes;

  const refNavNode = navNode({});

  console.log(oHeaderNodes);

  return (
    <header className={`header header__mrv`}>
      <div className={`vBox color__primary__text heading__large gap__0rem`}>
        <BreadcrumbBar sAppName={sAppName} oNavNodes={oHeaderNodes} />
        <div className={`hBox color__primary__text heading__large gap__05rem`}>
          {sPageTitle}
        </div>
      </div>
    </header>
  );
}

export { HeaderMRV };
