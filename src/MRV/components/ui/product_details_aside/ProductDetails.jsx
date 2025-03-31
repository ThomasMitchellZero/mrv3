import { bifrostAPI } from "../../../../local_APIs/bifrost";
import { SidesheetMRV } from "../../layout/sidesheet/SidesheetMRV";
import { useOutlet, useOutletContext } from "react-router-dom";

import { ProductImg } from "../product_img/ProductImg";

function ProductDetails({ children, fHandleClose = () => {}, oProduct = {} }) {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const bifrost = useContext(bifrostAPI);

  const sImageKey = oProduct.bifrostKey;

  return (
    <SidesheetMRV
      sTitle="Product Details"
      sNavBtn="Close"
      fNavBtnClick={fHandleClose}
    >
      <div className={`hBox`}>
        <ProductImg oProduct={oProduct} />
      </div>
      {children}
    </SidesheetMRV>
  );
}

export { ProductDetails };
