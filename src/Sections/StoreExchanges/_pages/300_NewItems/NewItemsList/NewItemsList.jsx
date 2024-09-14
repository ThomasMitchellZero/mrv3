import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { NewItemTileSTRX } from "./NewItemsTileSTRX";

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
    return <NewItemTileSTRX key={itemAtom.atomItemNum} itemAtom={itemAtom} />;
  });

  return aNewItems.length ? (
    <div className={`cardContainer`}>
      {uiTilesArr}
    </div>
  ) : (
    uiScanScreen
  );
}

export default NewItemsList;
