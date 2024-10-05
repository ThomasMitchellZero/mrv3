import "./LabeledValueMRV.css";

function LabeledValueMRV({
  sContainerClasses = "",
  labelStr = "NO LABEL",
  sLabelClasses = "",
  valueStr = "NO VALUE",
  sValueClasses = "",
  valueHeight = "auto",
  size = "M",
  ref_size____M_S,
  width = "",
}) {
  const oConfigs = {
    M: {
      labelSize: "body__small",
      valueSize: "heading__large",
    },
    S: {
      labelSize: "tinyText",
      valueSize: "body__large",
    },
  };

  const sLabelStyle = `${oConfigs[size]?.labelSize || null} ${sLabelClasses}`;
  const sValueStyle = `${oConfigs[size]?.valueSize || null} ${sValueClasses}`;

  const oStyle = {};

  if (width) {
    oStyle.width = width;
  }

  return (
    <div
      className={`LabeledValueMRV ${size} ${sContainerClasses}`}
      style={oStyle}
    >
      <div
        className={`label color__primary__text ${oConfigs[size].labelSize} ${sLabelClasses}`}
      >
        {labelStr}
      </div>
      <div
        className={`value centerAll color__primary__text`}
        style={{ height: valueHeight }}
      >
        <div className={`inner ${sValueStyle}`}>{valueStr}</div>
      </div>
    </div>
  );
}

export { LabeledValueMRV };
