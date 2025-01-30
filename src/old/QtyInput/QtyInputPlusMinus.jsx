import "./QtyInput.css";

import {
  useSetLocStFields,
  useResetLocStFields,
} from "../../mrv/MRVhooks/MRVhooks";
import { locStFields } from "../../globalFunctions/globalJS_classes";

// For the full, standard Input Qty experience
const QtyInputPlusMinus = ({
  value,
  minVal = 0,
  maxVal = 999,
  onChange = (e) => {},
  onPlusMinus = (isPlus) => {},
}) => {
  const refLocFields = locStFields;

  return (
    <div className={`qtyInputPlusMinus`}>
      <button className={`ghost`} onClick={() => {}}>-</button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e)}
        min={minVal}
        max={maxVal}
      />
      <button className={`ghost`} onClick={() => {}}>+</button>
    </div>
  );
};
