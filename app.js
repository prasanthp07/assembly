
/**
 * Project          : Note
 * Module           : Clustering and Bootstrapping
 * Source filename  : app.js
 * Description      : App Entry point , which loads and bootstrap all modules.
 * Author           : Prasanth P <>
 * Copyright        : Copyright © 2020, Note
 *                    Written under contract by .
 *                    
 */

"use strict";

require("dotenv").config();

var env = process.env.NODE_ENV || "development";
var config = require("./configs/config");

// Load  modules
var express = require("express");
var session = require("express-session");
const morgan = require("morgan");
const useragent = require("express-useragent");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./configs/logger");
const constants = require("./configs/constants");
var utils = require("./utils/util");
var _ = require("lodash");
logger.info("Entering environment \"" + env + "\"");

var app = express();
app.use("/staticdata", express.static("staticdata"));
app.use("/docs", express.static("apidocs"));
app.use(cors())
app.use(helmet());
app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




//development environment only settings. 
app.use(morgan("dev")); //Options: combined/common/dev

if (env !== "production") {
    app.use(morgan(":method :url :status :response-time ms - :res[content-length] :req[headers]"));
} else {
    app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));
}

app.all("*", (req, res, next) => {
    var headers = _.clone(req.headers);
    var body = _.clone(req.body);
    logger.info("---------------------------------------------------------------------------");
    logger.info("%s %s on %s from ", req.method, req.url, new Date(), req.useragent.source);
    logger.info("Request Headers: ", (headers) ? JSON.stringify(headers) : "");
    logger.info("Request Body: ", (body) ? JSON.stringify(body) : "");
    logger.info("---------------------------------------------------------------------------");
    next();
});
//loading all routes and models
require("./configs/loader")(app, utils, config, constants, logger);

//Handle unhandled errors, if any. At this point, we will just kill the process and let the master cluster process spawn a new cluster. 
app.use(function errorHandler(err, request, response, next) {
    var errorMessage = "";
    //We will send the server log to client/connector developers in the developer mode. 
    if (env === "development") {
        errorMessage = "Contact Admin with this error log :" + err.stack;
        logger.error("err: ", err);
    }
    //Return the error
    response.status(500).send(errorMessage);

    //Kill self
    if (err.domain) {
        try {
            // make sure we close down within 30 seconds
            var killtimer = setTimeout(function () {
                process.exit(1);
            }, 30000);
            killtimer.unref();
        } catch (er2) {
            logger.error("Error sending 500!", er2.stack);
        }
    }
    next();
});

//to check DB status
app.all("/healthCheck", (req, res) => {
    if (mongoose.connection.readyState === 0) {
        res.status(500).send("Database Error");
    } else {
        res.status(200).send("Database Status : Active");
    }
});

//server listening to port
app.listen(config.port, function () {
    logger.info("Server Listening to port :", config.port);
});
module.exports = app;