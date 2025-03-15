import { dProduct, dSaleRecord } from "../MRV/mrv_data_types";

import React from "react";


const SaleRecordsAPI = React.createContext({

    "888111": dSaleRecord({
        sKey: "888111",
        sInvoNum: "888111",
        sRecordType: "Sale",
        oItemsSold: {
            "3300": dProduct({
                sInvoNum: "888111",
                sKey: "3300",
                iQty: 3,
                sItemNum: "3300",
                sBifrostKey: "3300",
                iUnitBaseValue: 489,
                iUnitTax: 48,
            }),
            "4400": dProduct({
                sInvoNum: "888111",
                sKey: "4400",
                iQty: 2,
                sItemNum: "4400",
                sBifrostKey: "4400",
                iUnitBaseValue: 889,
                iUnitTax: 88,
            }),
        },
    }),

    "888222": dSaleRecord({
        sKey: "888222",
        sInvoNum: "888222",
        sRecordType: "Sale",
        oItemsSold: {
            "5500": dProduct({
                sInvoNum: "888222",
                sKey: "5500",
                iQty: 5,
                sItemNum: "5500",
                sBifrostKey: "5500",
                iUnitBaseValue: 599,
                iUnitTax: 59,
            }),
            "4400": dProduct({
                sInvoNum: "888222",
                sKey: "4400",
                iQty: 4,
                sItemNum: "4400",
                sBifrostKey: "4400",
                iUnitBaseValue: 1050,
                iUnitTax: 105,
            }),
        },
    }),

});

export { SaleRecordsAPI };