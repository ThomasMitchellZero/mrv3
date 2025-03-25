import { oBaseLocState, dError } from "../../../../mrv_data_types";

const ReturnPhase_locState = {
  ...oBaseLocState,
  sMode: "receipts",
  sActiveDataKey: "",
  oErrorObjects: {
    invalidReceipt: dError("invalidReceipt", "Invalid receipt #", true),
    duplicateReceipt: dError(
      "duplicateReceipt",
      "Receipt already added to transaction",
      true
    ),
    invalidItem: dError("invalidItem", "Invalid item #", true),
    invalidQty: dError("invalidQty", "Invalid quantity", true),
  },
};

export { ReturnPhase_locState };
