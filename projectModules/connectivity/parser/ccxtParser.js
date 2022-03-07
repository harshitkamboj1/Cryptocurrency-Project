"use strict";

const Ftx = require("cryo/actors/mktdatasource/ftx-rest.js");
const Bitmex = require("cryo/actors/mktdatasource/bitmex-rest.js");

// const ccxt = require('ccxt');
// var ccxtSource = require('cryo/connectivity/ccxtSource.js')

class CcxtParser {
    constructor(aConfig) {
        this.sources = aConfig.exchange.rest;
        // this.ccxtSource = new ccxtSource(this.exchangeList);
    }

    getCcxtSource(exchangeIndex, aDataHandler){        
        // this.ccxtSource.getfunding(exchangeIndex, aDataHandler);
        if(Object.keys(this.sources)[exchangeIndex] == "FTX"){
            console.log('ftx source');
            return new Ftx( this.sources[Object.keys(this.sources)[exchangeIndex]], aDataHandler)    
        }
        else {
            return new Bitmex(this.sources[Object.keys(this.sources)[exchangeIndex]], aDataHandler);
        }
    }

    getNumCcxtSource(){
        return Object.keys(this.sources).length;
    }

    getCcxtSourceName(exchangeIndex){
        return Object.keys(this.sources)[exchangeIndex];
    }
}

module.exports = CcxtParser;