"use strict";

const logger = require("winston");

var winston = require("winston");
require('winston-daily-rotate-file');

class Logger {
    constructor(aDir, aFileSuffix, aClock) {
        this.format = winston.format.printf(({message}) => {
            return JSON.stringify(aClock.getTime()) + `,${message}`;
        });
        this.logger = winston.createLogger({
            transports : [
                new winston.transports.DailyRotateFile({
                    datePattern: "YYYYMMDD",
                    filename: "%DATE%."+aFileSuffix,
                    dirname: aDir,
                    zippedArchive: true
                })
            ],
            format : this.format
        });
    }
    log(aMsg) {
        this.logger.info(aMsg);
    }
}

module.exports = Logger;