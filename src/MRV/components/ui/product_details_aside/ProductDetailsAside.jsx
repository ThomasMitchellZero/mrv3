import { bifrostAPI } from "../../../../local_APIs/bifrost";
import { SidesheetMRV } from "../../layout/sidesheet/SidesheetMRV";
import { useOutlet, useOutletContext } from "react-router-dom";
import { useContext } from "react";

import { ProductImg } from "../product_img/ProductImg";

function ProductDetailsAside({
  children,
  fHandleClose = () => {},
  oProduct = {},
}) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const bifrost = useContext(bifrostAPI);

  // this is wrong, I need to wire it to the actual image property.
  const sImageKey = oProduct.bifrostKey;

  return (
    <SidesheetMRV
      sTitle="Product Details"
      sNavBtn="Close"
      fNavBtnClick={fHandleClose}
    >
      <div className={`hBox`}>
        <ProductImg sImgKey={sImageKey} sSize="4rem" />
      </div>
      {children}
    </SidesheetMRV>
  );
}

export { ProductDetailsAside };
