import { FooterMRV } from "../../../../../components/layout/footer/FooterMRV";
import { centsToDollars } from "../../../../../mrv_controller";

function FooterCWEX({
  sBtnLabel = "Continue",
  fBtnAction = () => {
    console.log("No CWEX Btn provided");
  },
}) {
  const iCentReturnItemValue = -42000;
  const iCentNewItemCost = 6900;
  const iCentTotal = iCentReturnItemValue + iCentNewItemCost;

  // Cash Breakdown ///////////////////////////////////////////////////

  const aRowData = [
    { sLabel: "Return Item Value:", iCentValue: -42000 },
    { sLabel: "New Item Cost:", iCentValue: 6900 },
  ];

  const uiCashRow = (oRowData) => {
    const sRowColor =
      oRowData.iCentValue > 0 ? "color__primary__text" : "color__green__text";
    return (
      <div key={oRowData.sLabel} className={`cashRow ${sRowColor}`}>
        <div className={`cashLabel body__medium`}>{oRowData.sLabel}</div>
        <div className={`cashValue body__large bold`}>
          {`$${centsToDollars(oRowData.iCentValue)}`}
        </div>
      </div>
    );
  };

  const uiCashRowArr = aRowData.map((oThisRowData) => uiCashRow(oThisRowData));

  // Total ///////////////////////////////////////////////////

  const oTotalConfigs = {
    refund: {
      sLabel: "total refund:",
      sColor: "color__green__text",
    },
    charge: {
      sLabel: "total due:",
      sColor: "color__primary__text",
    },
  };

  const sActiveTotalKey = iCentTotal < 0 ? "refund" : "charge";
  const oActiveTotal = oTotalConfigs[sActiveTotalKey];

  // Button Container ///////////////////////////////////////////////////

  const phActiveError = false;
  const uiActiveError = phActiveError ? (
    <div className={`warning`}>Error</div>
  ) : null;

  const uiCWEXmoney = (
    <>
      <div className={`cashRowsCol`}>{uiCashRowArr}</div>
      <div className={`cashTotalCol ${oActiveTotal.sColor}`}>
        <div className={`body__small`}>{oActiveTotal.sLabel}</div>
        <div className={`heading__large`}>
          {`$${centsToDollars(iCentTotal)}`}
        </div>
      </div>
    </>
  );

  return <FooterMRV sBtnLabel={sBtnLabel} fBtnAction={fBtnAction} />;
}

export { FooterCWEX };
