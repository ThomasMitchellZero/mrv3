import { useState, useRef } from "react";
import { useNodeNav } from "../../../../mrv_controller";
import { useOutlet, useOutletContext } from "react-router-dom";

import { dLocalCtx, dError, oBaseLocState } from "../../../../mrv_data_types";

import { HeaderCWEX } from "../../components/layout/header_cwex/HeaderCWEX";
import { FooterCWEX } from "../../components/layout/footer/FooterCWEX";

function NewItemsPhase() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const oDerived = mrvCtx.oDerived;
  const nodeNav = useNodeNav();

  // Page Configs ///////////////////////////////////////////////////

  const initPageLS = {};

  const oPage = dLocalCtx({
    oInitLS: initPageLS,
    oResets: {},
    oErrorObjects: {
      invalidQty: dError({
        sKey: "invalidQty",
        sMessage: "Invalid quantity",
      }),
    },
  });

  const oPageLS = oPage.oLocalState;
  const fSetPageLS = oPage.fSetLocalState;
  const oResets = oPage.oResets;

  //--------------------------------------------------------------
  // Page Logic
  //--------------------------------------------------------------

  const handleContinue = () => {};

  //--------------------------------------------------------------
  // UI Side Sheets
  //--------------------------------------------------------------

  const sAsideKey = "";

  const oAsides = {};

  //--------------------------------------------------------------
  // UI Main Panel
  //--------------------------------------------------------------

  const oMainPanel = {};

  const sModeKey = "";

  const oMainPanels = {};

  ///////////////////////////////////////////////////////////////////
  //  Export Component
  ///////////////////////////////////////////////////////////////////

  return (
    <main onClick={() => {}} className={`mrvPage`}>
      <div className={`mrvPanel__main `}>
        <HeaderCWEX sPageTitle={`Add New Items`} />
        <div className={`body`}></div>
        <FooterCWEX fBtnAction={handleContinue} />
      </div>
    </main>
  );
}

export { NewItemsPhase };
