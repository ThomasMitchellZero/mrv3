import "./CardSummaryCol.css";

import { MdClose } from "react-icons/md";

function CardSummaryCol({
  sTextColorClass = "color__primary__text",
  sBigVal = "$-4.20",
  sSmallVal = "Tax: $0.69",
  fHandleClose = () => {
    console.log("Close clicked");
  },
}) {
  return (
    <div className={`cardSummaryCol gap__05rem align__start`}>
      <div className={`hBox flex__min justify__end width__max`}>
        <button onClick={fHandleClose} className={`closeBtn secondary`}>
          <MdClose size={`1.5rem`} />
        </button>
      </div>
      <div
        className={`vBox flex__max width__max align__end justify__end gap__0rem width__max`}
      >
        <p className={`bigVal ${sTextColorClass}`}>{sSmallVal}</p>
        <h4 className={`heading__small ${sTextColorClass}`}>{sBigVal}</h4>
      </div>
    </div>
  );
}

export { CardSummaryCol };
