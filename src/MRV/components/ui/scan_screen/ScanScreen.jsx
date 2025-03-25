import { IconMRV } from "../icon/IconMRV";

/**
 * A screen that prompts the user to scan an item
 * @param {Object} props - Component properties
 * @param {("box"|"receiptLong"|"cart"|"alert"|"info"|"success"|"critical")} [props.sIconKey] - Specifies the icon to display
 * @param {string} [props.mainTitle="Main Title"] - The main title of the screen
 * @param {string} [props.subtitle="Subtitle"] - The subtitle of the screen
 * @param {JSX.Element} [props.subtitleJSX=null] - Additional JSX to display below the subtitle
 * @param {string} [props.sIconKey="sick"] - The icon to display on the screen
 * @returns {JSX.Element} The rendered ScanScreen component
 */

const ScanScreen = ({
  mainTitle = "Main Title",
  subtitle = null,
  subtitleJSX = null,
  sIconKey = "sick",
}) => {
  const iconConfig = (
    <IconMRV
      sIconKey={sIconKey}
      ctnrSize="8rem"
      fontSize="6rem"
      sIconColor="color__primary__text"
      sBackgrounColor="color__white"
    />
  );

  const sTextClasses = `hBox flex__min align__center justify__center`;

  const uiSubtitle = subtitleJSX ? (
    subtitleJSX
  ) : subtitle ? (
    <p className={`color__tertiary__text body__large`}>{subtitle}</p>
  ) : null;

  return (
    <div className={`vBox align__center justify__center`}>
      {iconConfig}
      <h3 className={`${sTextClasses} heading__medium color__primary__text`}>
        {mainTitle}
      </h3>
      {uiSubtitle}
    </div>
  );
};

export { ScanScreen };

/*



*/
