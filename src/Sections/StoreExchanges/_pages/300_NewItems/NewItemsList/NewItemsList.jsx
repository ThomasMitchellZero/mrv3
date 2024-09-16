import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { NewItemsTileSTRX } from "./NewItemsTileSTRX";
import { NewItemCardSTRX } from "./NewItemsCard";

function NewItemsList() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const aNewItems = sessionMRV.newItems;
  console.log(aNewItems);

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

  return aNewItems.length ? (
    <div className={`cardContainer`}>
      <div className={`columnTitleRow cols`}>
        <div className={`itemCol`}>New Items Cart</div>
        <div className={`rtrnCol`}></div>
        <div className={`qtyCol`}></div>
        <div className={`iconCol`}></div>
      </div>
      {uiTilesArr}
    </div>
  ) : (
    uiScanScreen
  );
}

export { NewItemsList };
