"use strict";

var Logger = require('cryo/utils/logger/inProcessLogger.js')

class loggerParser {
    constructor(aConfig) {
        this.dir = aConfig.logger.dir;
    }

    getLoggerType() {
        return Logger;
    }
}

module.exports = loggerParser;