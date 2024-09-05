import { Sidesheet_Base_MRV } from "../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";
import { ProductImageMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ProductImageMRV";
import { ReasonPickerSC_MRV } from "../../../../../mrv/mrv-components/inputs/ReasonPicker/ReasonPicker_SC_MRV";

import { makeLocStFields } from "../../../../../globalFunctions/globalJS_classes";
import { useOutletContext } from "react-router-dom";
import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";
import { useFindAtom } from "../../../../../mrv/MRVhooks/MRVhooks";

import { useContext } from "react";
import ProductContext from "../../../../../store/product-context";

function RtrnItemDetails30({}) {
  const mrvCtx = useOutletContext();
  const findAtom = useFindAtom();

  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const activeItemKey = locStRt.page.activeKey1;


  const productCtx = useContext(ProductContext);

  const refLocFields = makeLocStFields({});

  const activeItem = findAtom({itemNum: activeItemKey, asIndex: false});
  return (
    <Sidesheet_Base_MRV title="Return Item Details">
      <div className={`itemDetails`}>
        <div className="miniDetails">
          <ProductImageMRV size="S" itemAtom={activeItem} imageOnly={true} />
        </div>
        <ReasonPickerSC_MRV />
      </div>
    </Sidesheet_Base_MRV>
  );
}

export { RtrnItemDetails30 };
