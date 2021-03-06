/**
 * Project          : Note
 * Module           : Constants
 * Source filename  : constants.js
 * Description      : Common  messages and codes.
 * Author           : Prasanth P <prasanthp.p07@gmail.com>
 */

"use strict";

module.exports = {
    code: {
        HTTP_ERR: 400,
        CONFLICT: 409,
        HTTP_SUCCESS: 200,
        SUCCESS: 200,
        INVALID: 400,
        HTTP_POST_S: 201, //post request succcess
        POST_S: 201,
        HTTP_GET_S: 200,  //get request Success
        GET_S: 200,
        HTTP_GET_NF: 404, //get request NotFound (No Data) 
        GET_NF: 404,
        HTTP_GET_F: 404,  //get request Failure
        DB_FAILURE: 500,
        DB_ERR: 500,
        NOT_FOUND: 404,
        NOT_AUTHERIZED: 401,
        FORBIDDEN: 403,
        USER_FORBIDDEN: 403,
        NO_RECORDS: 404,
        BAD_REQUEST: 400,
        BAD_PARAMS: 400,
        PARAM_MISSING: 400,
        NO_PARAMS: 400,
        PWD_MISMATCH: 400,
        DB_DUPLICATE: 4009,
        SERVICE_ERR: 400,
        ERR: 4000 
    },
    text: {
        en: require("./localization/en.json"),
        
    },
    langs: ["en"],
    defaultParams: {
        SKIP: 0,
        LIMIT: 20
    }
};

