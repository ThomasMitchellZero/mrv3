import "./ProductImageMRV.css";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useCentsToDollars } from "../../MRVhooks/MRVhooks";
import ProductContext from "../../../store/product-context";
import { useContext } from "react";
import { returnAtom } from "../../../globalFunctions/globalJS_classes";

function ProductImageMRV({
  itemAtom = new returnAtom({}),
  showChildArrow = false,
  showSpacer = false,
  size = "L",
  REF_size____L_M_S,
}) {
  const productCtx = useContext(ProductContext);
  const ctxItemInfo = productCtx[itemAtom.bifrostKey];
  const prodImg = ctxItemInfo.img;

  const imagePrefix = showChildArrow ? (
    <div className={`childArrowCtnr`}>
      {<MdSubdirectoryArrowRight size={"2rem"} />}
    </div>
  ) : showSpacer ? (
    <div className={`childArrowCtnr`}>{uiChildArrow}</div>
  ) : null;

  return (
    <div className={`productImageMRV ${size}`}>
      {imagePrefix}
      <div className={`imageCtnr`}>
        <img className={`image`} src={prodImg} alt="Product" />
      </div>
    </div>
  );
}

export { ProductImageMRV };
