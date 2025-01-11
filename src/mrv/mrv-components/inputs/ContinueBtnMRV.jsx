function ContinueBtnMRV({
  btnText = "Continue",
  warningText = "",
  handleClick = () => {
    console.log("No Continue Function");
  },
}) {
  return (
    <div className={`continueBtnBox`}>
      <button onClick={handleClick} className={`primary continueBtn`}>
        {btnText}
      </button>
      <div className={`warning`}>{warningText}</div>
    </div>
  );
}

export { ContinueBtnMRV };
