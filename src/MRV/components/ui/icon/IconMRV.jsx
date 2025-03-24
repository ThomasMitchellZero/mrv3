import { FaBoxOpen, FaBarcode } from "react-icons/fa6";
import {
  MdReceiptLong,
  MdOutlineShoppingCart,
  MdOutlineWarning,
  MdSick,
  MdInfo,
  MdCheckCircle,
  MdOutlineRemoveCircle,
} from "react-icons/md";

/**
 * Standard icons for MRV
 *
 * @param {("box"|"receiptLong"|"cart"|"alert"|"info"|"success"|"critical")} [props.sIconKey] - Specifies the icon to display
 * @param {string} [props.ctnrSize="2.5rem"] - The size of the container
 * @param {string} [props.fontSize="2rem"] - The size of the icon
 * @param {string} [props.backgroundColor=""] - The background color of the container
 * @param {string} [props.color="color__primary__text"] - The color of the icon
 * @param {string} [props.radius="100%"] - The border radius of the container
 * @returns {JSX.Element} The rendered header component
 */

function IconMRV({
  sIconKey = "sick",
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
    box: <FaBoxOpen {...styleObj} />,
    receiptLong: <MdReceiptLong {...styleObj} />,
    cart: <MdOutlineShoppingCart {...styleObj} />,
    alert: <MdOutlineWarning {...styleObj} />,
    info: <MdInfo {...styleObj} />,
    success: <MdCheckCircle {...styleObj} />,
    critical: <MdOutlineRemoveCircle {...styleObj} />,
    barcode: <FaBarcode {...styleObj} />,
  };

  const outIcon = iconsObj[sIconKey] || iconsObj.sick;

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
      className={`hBox ${color} ${backgroundColor}`}
    >
      {outIcon}
    </div>
  );
}

export { IconMRV };
