import { bifrostAPI } from "../../../../local_APIs/bifrost";
import { SidesheetMRV } from "../../layout/sidesheet/SidesheetMRV";
import { useOutlet, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { dProduct_bifrost, dProduct } from "../../../mrv_data_types";

import { ProductImg } from "../product_img/ProductImg";

function ProductDetailsAside({
  children,
  fHandleClose = () => {},
  oProduct = {},
  oPage = {},
}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const bifrost = useContext(bifrostAPI);

  const refProduct = dProduct({});
  const refBifrostProd = dProduct_bifrost({});

  // this is wrong, I need to wire it to the actual image property.
  const sImageKey = bifrost[oProduct.sBifrostKey].sImgKey;

  return (
    <SidesheetMRV
      sTitle="Product Details"
      sNavBtn="Close"
      fNavBtnClick={fHandleClose}
    >
      <div className={`hBox align__start width__max flex__min`}>
        <ProductImg sImgKey={sImageKey} sSize="4rem" />
      </div>
      {children}
    </SidesheetMRV>
  );
}

export { ProductDetailsAside };
