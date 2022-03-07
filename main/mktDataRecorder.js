"use strict";

var argv = require("minimist")(process.argv.slice(2));
const config = require(argv.conf);

var Clock = require("cryo/utils/time/realTimeMicroClock.js");
var MktDataParser = require("cryo/connectivity/parser/mktDataParser.js");
var LoggerParser = require("cryo/utils/logger/loggerParser.js");
var CcxtParser = require('cryo/connectivity/parser/ccxtParser.js');
const Recorder = require("cryo/actors/mktdatarecorder/allDataRecorder.js");

var myMktDataConnectors = [];
var myMktDataRecorders = [];

var myClock = new Clock();
var myMktDataParser = new MktDataParser(config);
var myLoggerParser = new LoggerParser(config);

var myCcxtMktDataConnectors = [];
var myCcxtMktDataRecorders = [];
var myCcxtParser = new CcxtParser(config);
var numCcxtSources = myCcxtParser.getNumCcxtSource();

for(var i=0;i<numCcxtSources;i++){
    var myCcxtSourceName = myCcxtParser.getCcxtSourceName(i);
    myCcxtMktDataRecorders[i] = new Recorder(myLoggerParser, myCcxtSourceName + '.ccxt', myClock);
    myCcxtMktDataConnectors[i] = myCcxtParser.getCcxtSource(i, myCcxtMktDataRecorders[i]); 
    myCcxtMktDataConnectors[i].connect();
}    

var numSources = myMktDataParser.getNumSources();
for (var i=0;i<numSources;i++) {
    var mySourceName = myMktDataParser.getSourceName(i);
    myMktDataRecorders[i] = new Recorder(myLoggerParser, mySourceName, myClock);
    myMktDataConnectors[i] = myMktDataParser.getSource(i, myMktDataRecorders[i]);
    myMktDataConnectors[i].connect();
}


// "use strict";

// var argv = require("minimist")(process.argv.slice(2));
// const config = require(argv.conf);

// const Ftx = require("cryo/connectivity/ftx.js");
// var logger = require("cryo/logger/fileLogger.js");
// var Clock = require("cryo/time/realTimeMicroClock.js");
// const Recorder = require("cryo/connectivity/mktdata/mktdatarecorder/allDataRecorder.js");

// var myExchangeNames = Object.keys(config);
// var numExchanges = myExchangeNames.length;
// var myMktDataConnectors = [];
// var myMktDataRecorders = [];

// var myClock = new Clock();
// for (var i=0;i<numExchanges;i++) {
//     var myExchange = myExchangeNames[i];
//     myMktDataRecorders[i] = new Recorder(logger, "data", myExchange, myClock);
//     if (myExchange == "FTX") {
//         myMktDataConnectors[i] = new Ftx(config[myExchange], 
//             myMktDataRecorders[i]);
//         myMktDataConnectors[i].connect();
//     }
// }