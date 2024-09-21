import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { BigLabeledValue } from "../../../../../mrv/mrv-components/DisplayOutputs/BigLabeledValue";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";
import { StatusIcon } from "../../../../../mrv/mrv-components/DisplayOutputs/IconComponents/StatusIcon";

import { useOutlet } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useContext } from "react";
import { useLocStMethods_STRX } from "../../../_resources/components/CompHooks_STRX";

import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";
import {
  useSetLocStFields,
  useResetLocStFields,
  useSetSessionItems,
  useFindAtom,
} from "../../../../../mrv/MRVhooks/MRVhooks";

function NewItemsTileSTRX({ itemAtom = new returnAtom({}) }) {
  const setSessionItems = useSetSessionItems();
  const locMethods = useLocStMethods_STRX().NewItems();
  const findAtom = useFindAtom();
  const setPageLS = useSetLocStFields("page");
  const resetPageLS = useResetLocStFields("page");

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const newItems = sessionMRV.newItems;
  const atomizedNewItems = sessionMRV.atomizedNewItems;
  const pageLSrt = sessionMRV.locSt.page;

  // In theory we should be able to get this from the atomizedNewItems array.
  const returnItemQty = findAtom({
    itemNum: itemAtom.atomItemNum,
    itemsArr: sessionMRV.returnItems,
    asIndex: false,
  }).atomItemQty;

  const tileQty = itemAtom.atomItemQty;
  const qtyStatus = !returnItemQty
    ? "noReturn"
    : returnItemQty === tileQty
    ? "valid"
    : "mismatchQty";

  // shared functions

  const thisTileAtoms = atomizedNewItems.filter(
    (atom) => atom.atomItemNum === itemAtom.atomItemNum
  );

  const handleItemQtyChange = (e) => {
    const newQty = e.target.value;

    setSessionItems({
      itemsArrRouteStr: "newItems",
      itemAtom: itemAtom,
      newQty: newQty,
      actionType: "edit",
    });
  };

  const handleTileClick = (e) => {
    e.stopPropagation();
    setPageLS({
      activeUI3: "NewItemProdInfoSTRX",
      activeKey1: itemAtom.atomItemNum,
      activeData1: itemAtom,
    });
    resetPageLS({ activeErrorALL: true });
  };

  const oConfigs = {};

  const mvpConfigs = {
    noReturn: {
      returnQty: "None",
      status: "badRed",
      iconStr: "critical",
    },
    valid: {
      returnQty: returnItemQty,
      status: "defaultBlack",
      iconStr: "success",
    },
    mismatchQty: {
      returnQty: returnItemQty,
      status: "defaultBlack",
      iconStr: "alert",
    },
  };

  // Logic-derived values

  const uiStatusIcon = (
    <StatusIcon status={mvpConfigs[qtyStatus].iconStr} fontSize={`3rem`} />
  );

  const isActive =
    itemAtom.atomItemNum === pageLSrt.activeKey1 ? "selected" : "";

  return (
    <div
      onClick={(e) => handleTileClick(e)}
      className={`tile tileSpan ${isActive}`}
    >
      <div className={`col itemSpan`}>
        <MRVitemDetails
          showPrice={false}
          showQty={false}
          thisItemAtom={itemAtom}
          twoLineDescription={true}
        />
      </div>
      <div className={`col tileInfoSpan`}>
        <div className={`col rtrnSpan centerAll`}>
          <BigLabeledValue
            labelStr={`Qty Returned`}
            valueStr={`${mvpConfigs[qtyStatus].returnQty}`}
            size={`M`}
            status={`${mvpConfigs[qtyStatus].status}`}
            valueHeight="4rem"
          />
        </div>
        <div className={`col qtySpan centerAll`}>
          <div className={`body__small minWidth color__primary__text`}>
            New Item Qty
          </div>
          <MRVinput>
            <input
              type={`number`}
              value={tileQty}
              onChange={(e) => {
                handleItemQtyChange(e);
              }}
            />
          </MRVinput>
        </div>
        <div className={`col iconSpan centerAll`}>{uiStatusIcon}</div>
      </div>
    </div>
  );
}

export { NewItemsTileSTRX };
