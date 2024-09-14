import { MdOutlineClose, MdArrowBack } from "react-icons/md";

function Sidesheet_Base_MRV({
  collapsed = false,
  title = "NO TITLE",
  btnIcon = null,
  REF_icon____close__back = "",
  fBgClick = () => {
    console.log("No BG Click Fn");
  },
  fNavBtnClick = () => {
    console.log("No Nav Btn Click Fn");
  },
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

  const icon = oIcons[btnIcon] || null;

  const handleBGClick = () => {
    fBgClick();
  };

  const handleNavBtnClick = (e) => {
    e.stopPropagation();
    fNavBtnClick();
  };

  const actionBtn = icon ? (
    <button
      onClick={(e) => {
        handleNavBtnClick(e);
      }}
      className={`mrvBtn miniBtn ghost padding__0`}
    >
      {icon}
    </button>
  ) : null;

  const sCollapse = collapsed ? "collapsed" : "";
  return (
    <section
      onClick={(e) => handleBGClick(e)}
      className={`mrvSidesheet gap2rem ${sCollapse}`}
    >
      <div className={`hBox minWidth__0 minFlex height2rem alignCenter `}>
        {actionBtn}
        <div className={` heading__small truncate`}>{title}</div>
      </div>
      <div className={`vBox`}> {children}</div>
    </section>
  );
}

export { Sidesheet_Base_MRV };
