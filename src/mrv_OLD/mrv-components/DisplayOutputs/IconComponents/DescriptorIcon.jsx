import "./DescriptorIcon.css";
import { FaBoxOpen, FaBarcode } from "react-icons/fa6";
import {
  MdReceiptLong,
  MdOutlineShoppingCart,
  MdOutlineWarningAmber,
  MdOutlineWarning,
  MdSick,
  MdInfo,
  MdCheckCircle,
  MdOutlineRemoveCircle,
  MdCircle,
} from "react-icons/md";

function DescriptorIcon({
  iconStr = "circle",
  ctnrSize = "2.5rem",
  fontSize = "2rem",
  backgroundColor = "",
  color = "color__primary__text",
  radius = "100%",
  REF_iconStr____circle__box__receiptLong__cart__alert__info__success__critical,
}) {
  const styleObj = {
    fontSize: fontSize,
    color: color,
  };

  const iconsObj = {
    sick: <MdSick {...styleObj} />,
    circle: <MdCircle {...styleObj} />,
    box: <FaBoxOpen {...styleObj} />,
    receiptLong: <MdReceiptLong {...styleObj} />,
    cart: <MdOutlineShoppingCart {...styleObj} />,
    alert: <MdOutlineWarning {...styleObj} />,
    info: <MdInfo {...styleObj} />,
    success: <MdCheckCircle {...styleObj} />,
    critical: <MdOutlineRemoveCircle {...styleObj} />,
    barcode: <FaBarcode {...styleObj} />,
  };

  const outIcon = iconsObj[iconStr] || iconsObj.sick;

  // I have no idea where the color for the icon is actually coming from.

  return (
    <div
      height={ctnrSize}
      style={{
        height: ctnrSize,
        width: ctnrSize,
        borderRadius: radius,
        color: color,
      }}
      className={`descriptorIcon ${color} ${backgroundColor}`}
    >
      {outIcon}
    </div>
  );
}

export { DescriptorIcon };
