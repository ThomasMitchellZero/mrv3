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
 *@param {Object} props - Component properties
 * @param {("box"|"receiptLong"|"cart"|"alert"|"info"|"success"|"critical"|"barcode")} [props.sIconKey] - Specifies the icon to display
 * @param {string} [props.ctnrSize="2.5rem"] - The size of the container
 * @param {string} [props.fontSize="2rem"] - The size of the icon
 * @param {string} [props.sBackgroundColor="color__white"] - The background color of the icon container
 * @param {string} [props.sIconColor="color__primary__text"] - The color of the icon itself
 * @param {string} [props.sRadius="100%"] - The border radius of the container
 * @returns {JSX.Element} The rendered header component
 */

function IconMRV({
  sIconKey = "sick",
  ctnrSize = "2.5rem",
  fontSize = "2rem",
  sBackgroundColor = "color__white",
  sIconColor = "color__primary__text",
  sRadius = "100%",
}) {
  const styleObj = {
    fontSize: fontSize,
    color: sIconColor,
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
      style={{
        height: ctnrSize,
        width: ctnrSize,
        borderRadius: sRadius,
        color: sIconColor,
      }}
      className={`hBox flex__min align__center justify__center ${sIconColor} ${sBackgroundColor}`}
    >
      {outIcon}
    </div>
  );
}

export { IconMRV };
