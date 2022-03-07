"use strict";

module.exports = {
    "exchange" : {
        "websocket" : {
            "FTX" : ["BTC/USD", "BTC-PERP", "ETH/USD", "ETH-PERP"],
            "BITMEX" : ["XBTUSD", "ETHUSD","XRPUSD"]
        },
        "rest" : {
            "FTX" : ["funding-BTC-PERP" ,"funding-ETH-PERP"],
            "BITMEX" : ["funding-XBTUSD", "funding-ETHUSD"]
        }
    },
    "logger" : {
        //  "dir" : "/home/prateek/Documents/Research/code/cryo/data"
       "dir" : "/home/mark/Downloads/cryo/data"
    }
}
