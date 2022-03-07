"use strict";

const Ftx = require("cryo/actors/mktdatasource/ftx.js");
const Bitmex = require("cryo/actors/mktdatasource/bitmex.js");

class MktDataParser {
    constructor(aConfig) {
        this.sources = aConfig.exchange.websocket;
    }

    getSourceName(i) {
        return Object.keys(this.sources)[i];
    }

    getSource(i, aDataHandler) {
        if(Object.keys(this.sources)[i] == "FTX"){
            console.log('ftx source');
            return new Ftx( this.sources[Object.keys(this.sources)[i]],aDataHandler)    
        }
        else {
            return new Bitmex(this.sources[Object.keys(this.sources)[i]], aDataHandler);
        }
    }

    getNumSources(){
        return Object.keys(this.sources).length;
    }
}

module.exports = MktDataParser;