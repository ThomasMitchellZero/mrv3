import { DescriptorIcon } from "../IconComponents/DescriptorIcon";

function ColumnLabelMRV({
  iconStr = "circle",
  bigLabel = "Big Label",
  smallLabel = "Small Label",
  REF_iconStr____circle__box__receiptLong__cart__alert__info__success__critical,
}) {
  return (
    <div className={`hBox minFlex alignCenter`}>
      <DescriptorIcon
        iconStr={iconStr}
        ctnrSize={`4.5rem`}
        fontSize={`3rem`}
        color="color__primary__text"
        backgroundColor={`color__surface__default`}
      />
      <div className={`vBox alignStart gap50pct`}>
        {bigLabel ? (
          <div className={`heading__small color__primary__text`}>
            {bigLabel}
          </div>
        ) : null}
        {smallLabel ? (
          <div className={`body color__secondary__text`}>{smallLabel}</div>
        ) : null}
      </div>
    </div>
  );
}

export { ColumnLabelMRV };
