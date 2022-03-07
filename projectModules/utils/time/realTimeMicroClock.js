"use strict";

var microtime = require("microtime");
var TimeStruct = require("cryo/objects/time/timeStruct.js");

class RealTimeMicroClock {
    constructor() {
        this.ts = new TimeStruct();
    }

    getTime() {
        var myTime = microtime.nowStruct();
        this.ts.initFromMicrotime(myTime);
        return this.ts;
    }

    setTime(aTime) {
    }
}

module.exports = RealTimeMicroClock;