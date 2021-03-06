/**
 * Project          : Note
 * Module           : Trail
 * Source filename  : trail.js
 * Description      : Api routes for the trail.
 * Author           : Prasanth P <>
 * Copyright        : Copyright © 2018, Note
 *                    Written under contract by .
 */

"use strict";
const express = require("express");

module.exports = function (app, utils, config, constants, logger) {
    var controller = require("../controllers/visitor")( utils, config, constants, logger);
    var router = express.Router();

    
    router.get("/", controller.fetch);
    
    app.use("/api/v1/visitors", router);

};