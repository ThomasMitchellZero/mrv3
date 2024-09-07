import "./BigLabeledValue.css";

function BigLabeledValue({
  labelStr = "NO LABEL",
  valueStr = "NO VALUE",
  status = "defaultBlack",
  labelMatchesValue = true,
  size = "M",
  ref_size____M_S,
  style = {},
  width = "",
  ref_status____defaultBlack_goodGreen_badRed_neutralGrey,
  invertColors = false,
}) {
  const invKey = invertColors ? "inverted" : "normal";

  const oConfigs = {
    defaultBlack: {
      normal: {
        color: "color__primary__text  color__surface__default",
      },
      inverted: {
        color: "color__white__text  color__primary",
      },
    },
    goodGreen: {
      normal: {
        color: "color__green__text  color__surface__default",
      },
      inverted: {
        color: "color__white__text  color__green",
      },
    },
    badRed: {
      normal: {
        color: "color__red__text  color__surface__default",
      },
      inverted: {
        color: "color__white__text  color__red",
      },
    },
    neutralGrey: {
      normal: {
        color: "color__primary__text  color__surface__lightgrey",
      },
      inverted: {
        color: "color__primary__text  color__surface__lightgrey", // Identical for now.
      },
    },
    M: {
      labelSize: "body__small",
      valueSize: "heading__large",
    },
    S: {
      labelSize: "tinyText",
      valueSize: "body__large",
    },
  };

  const oStyle = style;

  if (width) {
    oStyle.width = width;
  }

  return (
    <div
      className={`bigLabeledValue ${size} ${oConfigs[status][invKey].color}`}
      style={oStyle}
    >
      <div className={`label ${oConfigs[size].labelSize}`}>{labelStr}</div>
      <div className={`value ${oConfigs[size].valueSize}`}>{valueStr}</div>
    </div>
  );
}

export { BigLabeledValue };
