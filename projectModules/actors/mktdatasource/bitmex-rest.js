"use strict";

var ccxtSource = require('cryo/actors/mktdatasource/ccxtSource.js');

class BITMEXRest {
    constructor(aTokenList, aDataHandler) {
        this.tokenList = aTokenList;
        this.ccxtSource = new ccxtSource("BITMEX", aDataHandler);
    }

    connect() {
        setInterval(this.connected.bind(this), 60*1000);
    }

    connected() {
        var numTokens = this.tokenList.length;
        for (var i=0;i<numTokens;i++) {
            var myToken = this.tokenList[i];
            if(myToken.substring(0,7)=="funding"){
                this.ccxtSource.connect(myToken);
            }
        }
    }
}

module.exports = BITMEXRest;