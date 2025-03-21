import "./SidesheetMRV_style.css";
import { MdArrowBack, MdClose } from "react-icons/md";

/**
 *
 * @param {Object} props - Component properties
 * @param {("back"|"close")} [props.sNavBtn] - The navigation button type ("back" or "close")
 * @param {Function} - The function to run when the navigation button is clicked
 * @param {string} [props.sTitle=""] - The title to display in the sidesheet
 * @param {JSX.Element} [props.children=null] - The content to display in the sidesheet
 * @returns {JSX.Element} The rendered sidesheet component
 */

function SidesheetMRV({
  sTitle = "",
  sNavBtn = "",
  fNavBtnClick = () => {
    console.log("navBtn clicked");
  },
  children,
  ...rest
}) {
  const oNavIcon = {
    back: <MdArrowBack fontSize="2rem" />,
    close: <MdClose fontSize="2rem" />,
  };

  const uiNavBtn = sNavBtn ? (
    <button
      onClick={() => {
        fNavBtnClick();
      }}
      className={`navBtn`}
    >
      {oNavIcon[sNavBtn]}
    </button>
  ) : null;

  return (
    <aside className={`sidesheet mrvPanel__side gap__1rem `}>
      <div className={`hBox flex__min heading__medium gap__05rem`}>
        {uiNavBtn}
        {sTitle}
      </div>
      <div className={`vBox`}>{children}</div>
    </aside>
  );
}

export { SidesheetMRV };
