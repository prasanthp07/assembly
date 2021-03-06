/**
 * Project          : Note
 * Module           : Loader
 * Source filename  : loader.js
 * Description      : Loading all models and routes.
 * Author           : Prasanth P <>
 * Copyright        : Copyright © 2018, Note
 *                    Written under contract by .
 */
"use strict";

var fs = require("fs");
module.exports = function (app, utils, config, constants, logger) {

    // Paths
    var routePath = config.root + "/routes";


    // Bootstrap routes
    fs.readdirSync(routePath).forEach(function (file) {
        logger.info("Loading routes : " + file);
        require(routePath + "/" + file)(app, utils, config, constants, logger);
    });
};