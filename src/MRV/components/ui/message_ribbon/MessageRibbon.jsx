import "./MessageRibbon.css";

import { IconMRV } from "../icon/IconMRV";

/**
 * A reusable message ribbon component for displaying messages with different types and styles.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.sMessage="No Message"] - The message text to display on the ribbon.
 * @param {("success"|"info"|"alert"|"critical")} [props.sType="info"] - Type of ribbon.
 * @returns {JSX.Element} The rendered message ribbon component.
 */
const MessageRibbon = ({ sMessage = "No Message", sType = "info" }) => {
  const oConfig = {
    success: {
      sIconKey: "success",
      sBG_color: "color__ribbon__success",
      sIconColor: "color__green__text",
      sBarColor: "color__green",
    },
    info: {
      sIconKey: "info",
      sBG_color: "color__ribbon__info",
      sIconColor: "color__interactive__text",
      sBarColor: "color__interactive",
    },
    alert: {
      sIconKey: "alert",
      sBG_color: "color__ribbon__alert",
      sIconColor: "color__gold__text",
      sBarColor: "color__gold",
    },
    critical: {
      sIconKey: "critical",
      sBG_color: "color__ribbon__critical",
      sIconColor: "color__red__text",
      sBarColor: "color__red",
    },
  };

  return (
    <div className={`message-ribbon ${oConfig[sType].sBG_color}`}>
      <div className={`color-bar ${oConfig[sType].sBarColor} `} />
      <IconMRV
        sIconKey={sType}
        sIconColor={`${oConfig[sType].sIconColor}`}
        ctnrSize={`2rem`}
        fontSize={`1.5rem`}
        sBackgroundColor={`color__transparent`}
      />
      <p className={`color__primary__text align__start body__medium`}>
        {sMessage}
      </p>
    </div>
  );
};

export { MessageRibbon };
