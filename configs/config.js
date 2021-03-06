

"use strict";

var _ = require("lodash");

var defaults = {
    root: require("path").normalize(__dirname + "/.."),
    host: process.env.HOST || "http://localhost",
    port: process.env.PORT || 5001,
    SERVER_SECRET: process.env.SERVER_SECRET || "#SERVER_SECRET#",
    session: {
        maxAge: 86400000
    }
};

var config = {
    local: {
    },
    development: {
    }
};

module.exports = (function () {
    var env = process.env.NODE_ENV || "development";
    return _.merge(defaults, config[env]);
})();
