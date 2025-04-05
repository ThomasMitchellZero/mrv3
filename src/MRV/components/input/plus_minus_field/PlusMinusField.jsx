function PlusMinusField({
  iFieldValue = 0,
  fChangeFieldValue = (newVal) => {
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
    <div className={`hBox gap__0rem width__min flex__min`}>
      <button
        type="button"
        className={`ghost body__large bold`}
        onClick={() => fChangeFieldValue(iFieldValue - 1)}
      >
        -
      </button>
      <input
        type="number"
        className={`input `}
        value={iFieldValue}
        onChange={(e) => fChangeFieldValue(parseInt(e.target.value))}
      />
      <button
        type="button"
        className={`ghost body__large bold`}
        onClick={() => fChangeFieldValue(iFieldValue + 1)}
      >
        +
      </button>
    </div>
  );
}

export { PlusMinusField };
