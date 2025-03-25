import "./ScanScreenMRV.css";
import Universal from "../../../assets/lowes-icons/Picture-Icons/universal-scan.svg";
import Cart from "../../../assets/lowes-icons/Picture-Icons/Cart.svg";
import Receipt from "../../../assets/lowes-icons/Picture-Icons/Receipt.svg";
import { DescriptorIcon } from "./IconComponents/DescriptorIcon";

const ScanScreenMRV = ({
  mainTitle = "Main Title",
  subtitle = "Subtitle",
  subtitleJSX = null,
  imgStr = "",
  iconStr = "box",
  REF_iconStr____circle__box__receipt__receiptLong__cart__alert = "",
}) => {
  const iconConfig = (
    <DescriptorIcon
      ctnrSize="8rem"
      fontSize="6rem"
      color="color__primary__text"
      iconStr={iconStr}
      backgroundColor="color__surface__default"
    />
  );

  return (
    <div className={`vBox align__center justify__center scanScreen`}>
      {iconConfig}
      <h4 className={`heading__medium color__primary__text`}>{mainTitle}</h4>
      <p className={`color__tertiary__text body__large`}>{subtitle}</p>
      {subtitleJSX}
    </div>
  );
};

export { ScanScreenMRV };

/*



*/
