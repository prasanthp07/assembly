

/**
 * Project          : 
 * Module           :  Controller File
 * Source filename  : 
 * Description      : This file defines all the operation for Note module.
 * Author           : Prasanth P  <>
 * Copyright        : Copyright © 2021, 
 *                    Written under contract by .
 */

"use strict";
var _ = require("lodash");
const fs = require("fs");
const axios = require("axios");

module.exports = function (utils, config, constants, logger) {


    var controller = {};

    controller.fetch = async function (req, res) {
        try {

            if (!utils.checkStringfields(req.query, ["date", "museum"])) {
                return utils.sendParamsError(req, res);
            }
            let { date, museum } = req.query;
            date = new Date(+date);
            // console.log('date: ', date);
            let monthValue = date.getMonth() + 1;
            monthValue = monthValue > 9 ? monthValue : '0' + monthValue;

            let month = `${date.getFullYear()}-${monthValue}-01T00:00:00.000`;
            // console.log('month: ', month);



            let result = await axios.get('https://data.lacity.org/resource/trxm-jn3c.json');
            result = result.data;
            let output;
            for (let i = 0; i < result.length; i++) {
                if (result[i].month == month) {
                    output = result[i];

                    if (!output.hasOwnProperty(museum)) {
                        output = undefined
                    }
                    break;
                }
            }
            result = {};
            if (output)
                result = {
                    result: {
                        "month": utils.getMonthName(+monthValue),
                        "year": date.getFullYear(),
                        "museum": museum,
                        "visitors": +output[museum]
                    }
                }

            return utils.dbCallbackHandler(req, res, result, null);
        } catch (err) {
            logger.info("error Message", err);
            return utils.dbCallbackHandler(req, res, null, err);
        }

    }






    return controller;
}