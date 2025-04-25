import { IconMRV } from "../icon/IconMRV";

/**
 * A reusable column label component for MRV, displaying an icon, a main title, and optional subtext.
 *
 * @param {Object} props - Component properties.
 * @param {("box"|"receiptLong"|"cart"|"alert"|"info"|"success"|"critical"|"barcode")} [props.sIconKey] - Specifies the icon to display.
 * @param {string} [props.sMainTitle="No Column Label Title"] - The main title text to display.
 * @param {string} [props.sMiniSubtext="No Subtext"] - The optional subtext to display below the main title.
 * @returns {JSX.Element} The rendered column label component.
 */
function ColumnLabel({
  sIconKey,
  sMainTitle = "No Column Label Title",
  sMiniSubtext = "No Subtext",
}) {
  return (
    <div className={`hBox width__max flex__min`}>
      <IconMRV sIconKey={sIconKey} ctnrSize="5rem" fontSize="4rem" />
      <div className={`vBox`}>
        {sMainTitle ? (
          <div className={`heading__large`}>{sMainTitle}</div>
        ) : null}
        {sMiniSubtext ? (
          <div className={`body__small`}>{sMiniSubtext}</div>
        ) : null}
      </div>
    </div>
  );
}

export { ColumnLabel };
