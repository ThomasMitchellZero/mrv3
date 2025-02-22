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

  const lsMethods = useLocStMethods_STRX().NewItems();
  const findAtom = useFindAtom();
  const setPageLS = useSetLocStFields("page");
  const resetPageLS = useResetLocStFields("page");

  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const newItems = sessionMRV.newItems;
  const atomizedNewItems = sessionMRV.atomizedNewItems;
  const pageLSrt = sessionMRV.locSt.page;
  const itemExchStatus = lsMethods.itemExchStatus(itemAtom);

  // For MVP we have to check ReturnItemQty because they might return more than they are getting and that is not allowed until we can do Unlike Exchanges.
  const returnItemQty = itemExchStatus.returnItemQty;
  const qtyStatus = itemExchStatus.qtyStatus;

  // shared functions

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
              value={itemAtom.atomItemQty}
              onChange={(e) => {
                lsMethods.handleItemQtyChange(e, itemAtom);
              }}
            />
          </MRVinput>
        </div>
        <div className={`col iconSpan centerAll`}>
          <div className={`body__small minWidth color__white__text`}>.</div>
          {uiStatusIcon}
        </div>
      </div>
    </div>
  );
}

export { NewItemsTileSTRX };
