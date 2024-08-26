import { pad } from "lodash";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";

function BaseSidesheet_MRV({
  collapsed = false,
  title = "NO TITLE",
  btnIcon = null,
  REF_icon____close__back = "",
  bgClickf = () => {},
  children,
  ...rest
}) {
  const iconProps = {
    className: `color__primary__text`,
    fontSize: "2rem",
  };
  const oIcons = {
    close: <MdOutlineClose {...iconProps} />,
    back: <MdArrowBack {...iconProps} />,
  };

  console.log("btnIcon: ", btnIcon);

  const icon = oIcons[btnIcon] || null;

  const actionBtn = icon ? (
    <button
      onClick={() => {
        navBtnClick();
      }}
      className={`mrvBtn miniBtn ghost padding__0`}
    >
      {icon}
    </button>
  ) : null;

  const sCollapse = collapsed ? "collapsed" : "";
  return (
    <section className={`mrvSidesheet ${sCollapse}`} {...rest}>
      <div className={`hBox minWidth__0 minFlex alignCenter `}>
        {actionBtn}
        <div className={` heading__small truncate`}>{title}</div>
      </div>
      {children}
    </section>
  );
}

export { BaseSidesheet_MRV };
