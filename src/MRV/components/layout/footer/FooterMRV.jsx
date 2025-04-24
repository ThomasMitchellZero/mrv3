import "./FooterMRV_style.css";

import { centsToDollars } from "../../../mrv_controller";

function FooterMRV({
  sBtnLabel = "Continue",
  fBtnAction = () => {
    console.log("No Btn Function");
  },
  leftSlot = null,
}) {
  // Button Container ///////////////////////////////////////////////////

  const phActiveError = false;
  const uiActiveError = phActiveError ? (
    <div className={`warning`}>Error</div>
  ) : null;

  return (
    <footer className={`footer footerMRV`}>
      <div className={`left-slot`}>{leftSlot}</div>

      <div className={`btnCtnr`}>
        <button onClick={fBtnAction} className={`primary width__max jumbo`}>
          {sBtnLabel}
        </button>
        {uiActiveError}
      </div>
    </footer>
  );
}

export { FooterMRV };
