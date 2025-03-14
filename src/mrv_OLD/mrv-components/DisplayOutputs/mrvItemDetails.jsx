import "./mrvItemDetails.css";

import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useCentsToDollars } from "../../MRVhooks/MRVhooks";
import ProductContext from "../../../store/product-context";
import { useContext } from "react";
import { returnAtom } from "../../../globalFunctions/globalJS_classes";
import { ProductImageMRV } from "./ProductImageMRV";

// this should work from a completely standard product details object, since the actual product can be changed.

function MRVitemDetails({
  thisItemAtom = new returnAtom({ atomItemNum: "noProduct" }),
  showPrice = true,
  showItemNum = true,
  showModelNum = true,
  priceInCents = thisItemAtom.atomMoneyObj.unitTotal || undefined,
  showQty = true,
  qty = thisItemAtom.atomItemQty || undefined,
  descriptionLineLimit = 0,
  underArr = [],
  underArrWithContainer = null,
  showChildArrow = false,
  size = "L",
  REF__size____L_M_S,
}) {
  if (thisItemAtom.atomItemNum === "noProduct") {
    console.log("no product passed to MRVitemDetails");
  }

  const productContext = useContext(ProductContext);
  const centsToDollars = useCentsToDollars();

  const oConfig = {
    L: {
      imgSize: "L",
      price_qty: "body__large bold",
      item_model: "body__small",
      body: "body__large",
      gap: "gap25pct",
    },
    M: {
      imgSize: "M",
      price_qty: "body bold",
      item_model: "tinyText",
      body: "body",
      gap: "gap0rem",
    },
  };

  const ctxItemInfo = productContext[thisItemAtom.bifrostKey];

  const sDescription = thisItemAtom.customDescription || ctxItemInfo.description;

  // price is normally the unitTotal, but if priceInCents is passed, it will use that instead
  const uiPrice =
    showPrice && priceInCents ? (
      <div className={`${oConfig[size].price_qty}`}>{`$${centsToDollars(
        priceInCents
      )}`}</div>
    ) : null;

  // qty is normally the atomItemQty, but if this prop is passed, it will use that instead
  const uiQty =
    showQty && qty ? <div className={`body`}>{`${qty}    x`}</div> : null;

  const uiItemNum =
    showItemNum && thisItemAtom?.atomItemNum ? (
      <div className={`fart`}>{`Item# ${thisItemAtom.atomItemNum}`}</div>
    ) : null;

  const uiModelNum =
    showModelNum && ctxItemInfo?.modelNum ? (
      <div className={`fart`}>{`Model# ${ctxItemInfo.modelNum}`}</div>
    ) : null;

  return (
    <section className={`mrvProdInfo ${size}`}>
      <ProductImageMRV
        itemAtom={thisItemAtom}
        size={oConfig[size].imgSize}
        showChildArrow={showChildArrow}
      />

      <section className={`textColumn ${oConfig[size].gap}`}>
        <div
          className={`textRow ${oConfig[size].price_qty} color__primary__text`}
        >
          {uiQty}
          {uiPrice}
        </div>
        <div
          className={`textRow ${oConfig[size].item_model} color__tertiary__text`}
        >
          {uiItemNum}
          {uiModelNum}
        </div>
        <div className={`${oConfig[size].body} limitLines${descriptionLineLimit}`}>
          {sDescription}
        </div>
        <div className={`underArr`}>{underArr}</div>
        {underArrWithContainer}
      </section>
    </section>
  );
}

export { MRVitemDetails };

/*


*/

/*



*/
