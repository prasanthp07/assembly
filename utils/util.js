/**
 * Project          : Note
 * Module           : Utilities
 * Source filename  : utility.js
 * Description      : Utility functions for multiple modules.
 * Author           : Prasanth P <>
 * Copyright        : Copyright © 2018, Note
 *                     Written under contract by .
 */

"use strict";
var _ = require("lodash");
var constants = require("../configs/constants.js");
var logger = require("../configs/logger");
var async = require("async");
const config = require("../configs/config");
var fs = require("fs");
const CODE = constants.code;
const MSG = constants.text;
const EACH_LIMIT = 25;
module.exports = {



    //generic format function for sending error response
    notifyError: function (req, res, httpStatus, code, message, extraMsg) {
        //setting http status code for response      
        httpStatus = (typeof httpStatus === "undefined") ? 400 : CODE[httpStatus];

        //setting language preference for setting
        var lang = "en";


        if (!code) {
            code = "ERR";
        }

        if (!message) {
            message = "ERR";
        }
        var errorMsg = MSG[lang][message];
        if (extraMsg) {
            if (lang === "en") {
                errorMsg = errorMsg + " : " + extraMsg;
            } else {
                errorMsg = extraMsg + " : " + errorMsg;
            }
        }
        logger.info("CODE", CODE[code]);
        logger.info("errorMsg", errorMsg);
        res.status(httpStatus)
            .json({
                meta: {
                    code: CODE[code],
                    message: errorMsg,
                    timestamp: new Date()
                }
            });
    },



    //generic format function for sending Success response
    sendResponse: function (req, res, httpStatus, data, message, code, count) {
        code = (typeof code === "undefined") ? "SUCCESS" : code;
        httpStatus = (typeof httpStatus === "undefined") ? 200 : CODE[httpStatus];
        var skip;
        var limit;
        var lang = "en";

        res.status(httpStatus).json({
            meta: {
                code: CODE[code],
                message: MSG[lang][message],
                timestamp: new Date()
            },
            pagination: {
                skip: skip,
                limit: limit,
                totalCount: count
            },
            data: data
        });
    },

    sendDBError: function (req, res, err) {
        logger.info("sendDBError", err);
        if (err && err.code === 11000) {
            return module.exports.notifyError(req, res, "CONFLICT", "DB_DUPLICATE", "DB_DUPLICATE");
        } else {
            return module.exports.notifyError(req, res, "HTTP_ERR", "DB_ERR", "DB_ERR");
        }
    },

    sendNoRecordError: function (req, res, code) {
        if (code) {
            return module.exports.notifyError(req, res, "NOT_FOUND", "NO_RECORDS", code);
        } else {
            return module.exports.notifyError(req, res, "NOT_FOUND", "NO_RECORDS", "NO_RECORDS");
        }
    },

    sendDBCallbackErrs: function (req, res, err, data) {
        if (err) {
            return module.exports.sendDBError(req, res, err);
        } else {
            if (!data) {
                data = {};
            }
            return module.exports.sendResponse(req, res, "SUCCESS", data, "NO_RECORDS", "NO_RECORDS");
        }
    },

    sendParamsError: function (req, res, code, extraMsg) {
        if (code && code === "invalid") {
            return module.exports.notifyError(req, res, "HTTP_ERR", "BAD_PARAMS", "BAD_PARAMS", extraMsg);
        } else if (code && code === "required") {
            return module.exports.notifyError(req, res, "HTTP_ERR", "PARAM_MISSING", "PARAM_MISSING", extraMsg);
        } else {
            return module.exports.notifyError(req, res, "HTTP_ERR", "PARAM_MISSING", "PARAM_MISSING");
        }

    },

    sendBadReqError: function (req, res) {
        return module.exports.notifyError(req, res, "HTTP_ERR", "BAD_REQUEST", "BAD_REQUEST");
    },


    checkStringfields: function (data, fields) {

        for (let i = 0; i < fields.length; i++) {
            if (data[fields[i]] && data[fields[i]].length) {

            } else {
                return false;
            }
        }
        return true;

    },



    dbCallbackHandler: function (req, res, data, err) {
        if (!err && data) {
            return module.exports.sendResponse(req, res, "SUCCESS", data);
        } else {
            return module.exports.sendDBCallbackErrs(req, res, err, data);
        }
    },
    getMonthName: (month) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[month - 1];
    }




};
