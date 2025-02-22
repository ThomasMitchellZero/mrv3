import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { NewItemsTileSTRX } from "./NewItemsTileSTRX";
import { NewItemCardSTRX } from "./NewItemsCard";
import { MessageRibbonMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/MessageRibbonMRV";

function NewItemsList() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const aNewItems = sessionMRV.newItems;

  const uiScanScreen = (
    <ScanScreenMRV
      mainTitle={`Scan or Add New Items`}
      subtitle={`Customer receives new items when exchange is complete.`}
      iconStr={`cart`}
    />
  );

  const uiTilesArr = aNewItems.map((itemAtom) => {
    return <NewItemCardSTRX key={itemAtom.atomItemNum} itemAtom={itemAtom} />;
  });

  const uiRibbonStr = (
    <p className={`body color__primary__text`}>
      Currently, Return Items must be exchanged for
      <span className={`bold`}> identical </span>New Items.
    </p>
  );

  return aNewItems.length ? (
    <div className={`cardContainer`}>
      <MessageRibbonMRV message={uiRibbonStr} type="info" />
      <div className={`columnTitleRow spanCtnr`}>
        <div className={`tileSpan`}>
          <div className={`itemSpan`}>New Items Cart</div>
          <div className={`tileInfoSpan`}></div>
        </div>
        <div className={`deleteSpan`}>New Item Cost</div>
      </div>
      {uiTilesArr}
    </div>
  ) : (
    uiScanScreen
  );
}

export { NewItemsList };
