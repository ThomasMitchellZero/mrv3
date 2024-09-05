
import { makeLocStFields, errorObj } from "../../globalFunctions/globalJS_classes";


const LS_MRV_ReasonPickerSC = makeLocStFields({
  _keyStr: "ReasonPickerSC",
  oErrorObjects: {
    qtyExceeded: new errorObj({
      key: "qtyExceeded",
      str: "Too Many, Son",
    }),
    subZero: new errorObj({
      key: "subZero",
      str: "Minimum Value: 0",
    }),
  },
  activeMode1: "ItemOK",
});

export { LS_MRV_ReasonPickerSC };

