"use strict";

var exchange = require('cryo/actors/mktdatasource/exchange.js');

class BITMEX {
    constructor(aTokenList, aDataHandler) {
        this.tokenList = aTokenList;
        this.exchange = new exchange('wss://www.bitmex.com/realtime/', this.connected.bind(this), aDataHandler);
        this.pingTimerId = undefined;
    }

    connect() {
        this.exchange.connect();
    }

    connected() {
        clearInterval(this.pingTimerId);

        var numTokens = this.tokenList.length;
        for (var i=0;i<numTokens;i++) {
            var myToken = this.tokenList[i];
            var myReq = {
                "op": "subscribe",
                "args": ["orderBookL2:" + myToken]
            };
            console.log(JSON.stringify(myReq));
            this.exchange.send(JSON.stringify(myReq));
            myReq = {
                "op": "subscribe",
                "args" : ["trade:" + myToken]
            };
            console.log(JSON.stringify(myReq));
            this.exchange.send(JSON.stringify(myReq));
        }

        this.pingTimerId = setInterval(function timeout() {
            this.exchange.send(JSON.stringify({'op':'ping'}));
        }.bind(this), 10000);
    }
}

module.exports = BITMEX;