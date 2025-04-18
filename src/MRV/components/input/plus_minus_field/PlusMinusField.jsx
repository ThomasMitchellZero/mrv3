function PlusMinusField({
  iFieldValue = "",
  handleQtyChange = (newVal) => {
    console.log("New value: ", newVal);
  },
  bIsPlusDisabled = false,
  bIsMinusDisabled = false,
  bIsFieldDisabled = false,
}) {
  const oBtnConfig = {
    plus: {},
    minus: {},
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`hBox gap__0rem width__min flex__min`}
    >
      <button
        type="button"
        disabled={bIsMinusDisabled || bIsFieldDisabled}
        className={`ghost body__large bold`}
        onClick={() => handleQtyChange(parseInt(iFieldValue - 1))}
      >
        -
      </button>
      <input
        type="number"
        className={`input `}
        disabled={bIsFieldDisabled}
        min={0}
        value={iFieldValue}
        onChange={(e) => handleQtyChange(parseInt(e.target.value))}
      />
      <button
        type="button"
        disabled={bIsPlusDisabled || bIsFieldDisabled}
        className={`ghost body__large bold`}
        onClick={() => handleQtyChange(parseInt(iFieldValue + 1))}
      >
        +
      </button>
    </div>
  );
}

export { PlusMinusField };
