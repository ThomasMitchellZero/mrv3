import { DescriptorIcon } from "./DescriptorIcon";

function StatusIcon({
  status = "info",
  fontSize = "2rem",
  ctnrSize = null,
  REF_status____info__success__alert__critical,
}) {
  const oConfigs = {
    info: {
      icon: "info",
      color: "color__interactive__text",
    },
    success: {
      icon: "success",
      color: "color__green__text",
    },
    alert: {
      icon: "alert",
      color: "color__gold__text",
    },
    critical: {
      icon: "critical",
      color: "color__red__text",
    },
  };
  return (
    <DescriptorIcon
      iconStr={status}
      fontSize={fontSize}
      ctnrSize={ctnrSize || fontSize}
      color={oConfigs[status].color}
    />
  );
}

export { StatusIcon };
