
"use strict";

var env = process.env.NODE_ENV || "development";
var winston = require("winston");
require("winston-daily-rotate-file");
require("winston-mongodb");
var config = require("./config");

const tsFormat = () => (new Date()).toLocaleTimeString();

var transporter;
console.log(env,"env");
switch (env) {
    case "development":
    case "qa":
        transporter = [            
            new (winston.transports.DailyRotateFile)({
                filename: `./log`,
                timestamp: tsFormat,
                maxsize: "500MB",
                datePattern: "yyyy-MM-dd.",
                prepend: true,
                level: "verbose"
            }),
            new (winston.transports.Console)({
                level: "debug",
                stringify: true,
                colorize: true
            })
        ];
        break;
    default:
        transporter = [new (winston.transports.Console)({
            level: "debug",
            stringify: true,
            colorize: true
        })];
}

var logger = new (winston.Logger)({
    transports: transporter
});

logger.info("Loading logger ...");

module.exports = logger;