import "./MessageRibbonMRV.css";

import { useState } from "react";

import { DescriptorIcon } from "./IconComponents/DescriptorIcon";

const MessageRibbonMRV = ({
  message = "No Message Provided",
  type = "info",
  allowClose = false,
  info__success__alert__critical,
}) => {
  const [ribbonState, setRibbonState] = useState({
    isClosed: false,
  });

  const iconSize = "1.5rem";

  const oConfigs = {
    meltdown: {
      bgColor: "color__meltdown__magenta",
      accentColor: "color__green",
      iconColor: "color__white__text",
    },
    info: {
      bgColor: "color__ribbon__info",
      accentColor: "color__interactive",
      iconColor: "color__interactive__text",
    },
    success: {
      bgColor: "color__ribbon__success",
      accentColor: "color__green",
      iconColor: "color__green__text",
    },
    alert: {
      bgColor: "color__ribbon__alert",
      accentColor: "color__gold",
      iconColor: "color__gold__text",
    },
    critical: {
      bgColor: "color__ribbon__critical",
      accentColor: "color__red",
      iconColor: "color__red__text",
    },
  };

  let ribbonType = oConfigs[type] ? type : "meltdown";

  const activeIcon = (
    <DescriptorIcon
      iconStr={ribbonType}
      ctnrSize={iconSize}
      fontSize={iconSize}
      color={oConfigs[ribbonType].iconColor}
    />
  );

  return (
    <div className={`msgRibbon ${oConfigs[ribbonType].bgColor}`}>
      <div className={`colorBar ${oConfigs[ribbonType].accentColor}`} />
      <div className={`iconBox`}>{activeIcon}</div>
      <div className={`body color__primary__text`}>{message}</div>
    </div>
  );
};

export { MessageRibbonMRV };
