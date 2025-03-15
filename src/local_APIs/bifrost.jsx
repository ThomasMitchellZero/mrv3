import { dProduct_bifrost } from "../MRV/mrv_data_types";

import React from "react";

import faucet_img from "../assets/product-images/faucet.png";
import flowers_img from "../assets/product-images/flowers.png";
import frontload_washer_img from "../assets/product-images/samsung-front-load.png";
import hoses_img from "../assets/product-images/hoses.png";
import no_img from "../assets/product-images/no-image.png";
import paint_img from "../assets/product-images/paint.png";
import plant_img from "../assets/product-images/plant.png";
import plywood_img from "../assets/product-images/plywood.png";
import powerstrip_img from "../assets/product-images/power-strip.png";
import shower_img from "../assets/product-images/shower.png";
import sink_img from "../assets/product-images/sink.png";
import tapemeasure_img from "../assets/product-images/tape-measure.png";
import toilet_img from "../assets/product-images/toilet.png";
import topload_washer_img from "../assets/product-images/samsung-top-load.png";
import wallwart_img from "../assets/product-images/wall-wart.png";
import washer_img from "../assets/product-images/washer.png";
import child_arrow from "../assets/product-images/child-arrow.png";
import dryer_1_img from "../assets/product-images/dryer_1.png";
import dryer_2_img from "../assets/product-images/dryer_2.png";
import lpp_img from "../assets/product-images/lpp.png";
import PLACEHOLDER_img from "../assets/product-images/PLACEHOLDER.png";
import rtf_clamp_img from "../assets/product-images/rtf_clamp.png";
import rtf_hose_img from "../assets/product-images/rtf_hose.png";
import rtf_duct_img from "../assets/product-images/rtf_duct.png";
import washer_1_img from "../assets/product-images/washer_1.png";
import washer_2_img from "../assets/product-images/washer_2.png";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import walloutlet from "../assets/product-images/walloutlet.png";
import paintstick from "../assets/product-images/paintstick.png";
import windowscraper from "../assets/product-images/windowscraper.png"; 
import lifetime_warranty from "../assets/product-images/lifetime_warranty.png";
import craftsman_wrench from "../assets/product-images/craftsman_wrench.png";
import kobalt_hammer from "../assets/product-images/kobalt_hammer.png";


const bifrostAPI = React.createContext({

    "LWNB": dProduct_bifrost({
        sKey: "LWNB",
        sImgKey: lifetime_warranty,
        sDescription: "Lifetime Warranty Replacement",
        sModelNum: "LWNB",
        sItemNum: "LWNB",
    }),

    "3300" : dProduct_bifrost({
        sKey: "3300",
        sImgKey: paintstick,
        sDescription: "Project Source 1 Gal Paint Stick 10 Pack",
        sModelNum: "DR3345",
        sItemNum: "3300",
        iUnitBaseValue: 399,
        iUnitTax: 39,
    }),
    "4400" : dProduct_bifrost({
        sKey: "4400",
        sImgKey: walloutlet,
        sDescription: "Eaton Arrow Hart 15-Amp 125-volt Residential / Commercial Duplex Outlet, Gray",
        sModelNum: "WO04400",
        sItemNum: "4400",
        iUnitBaseValue: 899,
        iUnitTax: 89,
    }),
    "5500" : dProduct_bifrost({
        sKey: "5500",
        sImgKey: windowscraper,
        sDescription: "Warner 1.5-in Steel Paint Scraper",
        sModelNum: "WS5500",
        sItemNum: "5500",
        iUnitBaseValue: 599,
        iUnitTax: 59,
    }),
    "6611" : dProduct_bifrost({
        sKey: "6611",
        sImgKey: kobalt_hammer,
        sDescription: "Kobalt 16-oz Smoothed Face Steel Claw Hammer",
        sModelNum: "KH6611",
        sItemNum: "6611",
        iUnitBaseValue: 1299,
        iUnitTax: 129,
    }),
    "6612" : dProduct_bifrost({
        sKey: "6612",
        sImgKey: craftsman_wrench,
        sDescription: "Craftsman 10-in Chromium-Plated Adjustable Wrench",
        sModelNum: "CW6612",
        sItemNum: "6612",
        iUnitBaseValue: 1999,
        iUnitTax: 199,
    }),

});

export { bifrostAPI };