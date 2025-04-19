import { dProduct_bifrost } from "../MRV/mrv_data_types";

import React from "react";

import craftsman_wrench from "../assets/product-images/craftsman_wrench.png";
import kobalt_hammer from "../assets/product-images/kobalt_hammer.png";
import lifetime_warranty from "../assets/product-images/lifetime_warranty.png";
import no_product from "../assets/product-images/no_product.png";
import paintstick from "../assets/product-images/paintstick.png";
import walloutlet from "../assets/product-images/walloutlet.png";
import windowscraper from "../assets/product-images/windowscraper.png";

const bifrostAPI = React.createContext({
  "0000": dProduct_bifrost({
    sKey: "0000",
    sImgKey: "no_product",
    sDescription: "NO PRODUCT",
    sModelNum: "0000",
    sItemNum: "0000",
  }),

  "LWNB": dProduct_bifrost({
    sKey: "LWNB",
    sImgKey: "lifetime_warranty",
    sDescription: "Warranty Replacement: ",
    sModelNum: "LWNB",
    sItemNum: "LWNB",
    bLwEligible: true,
  }),

  "3300": dProduct_bifrost({
    sKey: "3300",
    sImgKey: "paintstick",
    sDescription: "Project Source 1 Gal Paint Stick 10 Pack",
    sModelNum: "DR3345",
    sItemNum: "3300",
    iUnitBaseValue: 399,
    iUnitTax: 39,
  }),
  "4400": dProduct_bifrost({
    sKey: "4400",
    sImgKey: "walloutlet",
    sDescription:
      "Eaton Arrow Hart 15-Amp 125-volt Residential / Commercial Duplex Outlet, Gray",
    sModelNum: "WO04400",
    sItemNum: "4400",
    iUnitBaseValue: 899,
    iUnitTax: 89,
  }),
  "5500": dProduct_bifrost({
    sKey: "5500",
    sImgKey: "windowscraper",
    sDescription: "Warner 1.5-in Steel Paint Scraper",
    sModelNum: "WS5500",
    sItemNum: "5500",
    iUnitBaseValue: 599,
    iUnitTax: 59,
  }),
  "6611": dProduct_bifrost({
    sKey: "6611",
    sImgKey: "kobalt_hammer",
    sDescription: "Kobalt 16-oz Smoothed Face Steel Claw Hammer",
    sModelNum: "KH6611",
    sItemNum: "6611",
    iUnitBaseValue: 1299,
    iUnitTax: 129,
    bLwEligible: true,
  }),
  "6622": dProduct_bifrost({
    sKey: "6622",
    sImgKey: "craftsman_wrench",
    sDescription: "Craftsman 10-in Chromium-Plated Adjustable Wrench",
    sModelNum: "CW6622",
    sItemNum: "6622",
    iUnitBaseValue: 1999,
    iUnitTax: 199,
    bLwEligible: true,
  }),
});

export { bifrostAPI };
