"use strict";

class AllDataRecorder {
    constructor(aLoggerParser, aSource, aClock) {
        console.log("tried to create all data recorder for "+aSource);
        var aLoggerType = aLoggerParser.getLoggerType();
        this.logger = new aLoggerType(aLoggerParser.dir, aSource+".txt", aClock);
    }

    message(aData) {
        // console.log("in mktDataUpdate")
        this.logger.log(aData);
    }
}

module.exports = AllDataRecorder;