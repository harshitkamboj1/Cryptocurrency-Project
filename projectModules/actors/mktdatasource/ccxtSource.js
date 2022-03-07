"use strict";

const ccxt = require('ccxt');

class CcxtSource{
    constructor(aExchangeName,aDataHandler) {
        this.exchange = aExchangeName;
        this.dataHandler = aDataHandler;
        this.lastTime = {};
        this.ccxtSource = new ccxt[this.exchange.toLowerCase()];
        // this.ccxtSource = [];
        // this.future = [];
        // for(var i = 0; i < Object.keys(this.sources).length; i++){
            // var source = (Object.keys(this.sources)[i]);
            // console.log('The Source is ' + source);
            // this.ccxtSource[i] = new ccxt[source.toLowerCase()];
            // this.future[i] = this.sources[source]
        // }
        // console.log(this.future);
    }
    
    async connect(myToken){
        // console.log(this.future);
        // for(var j = 0; j < this.future[exchangeIndex].length;j++){
            if(this.exchange == "FTX"){
                // console.log('FTX funding rate');
                var result = await this.ccxtSource.publicGetFundingRates({
                    'future': myToken.substring(8),
                });
                result = result.result[0];
                var time = result.time;
            }
            if(this.exchange == "BITMEX"){
                // console.log("Bitmex funding rate");
                var result = await this.ccxtSource.publicGetFunding({
                    "symbol": myToken.substring(8)
                });
                result = result[0];
                var time = result.timestamp;
            }
            
            if(!this.lastTime[myToken]){
                // console.log('The time' + time);
                this.lastTime[myToken] = time;
                // this.dataHandler.message(JSON.stringify(result));
            }
            if (this.lastTime[myToken] != time){
                console.log('logging data');
                console.log('last time : '+ this.lastTime[myToken] + ' This time '+time)
                this.dataHandler.message(JSON.stringify(result));
            }
            else {
                console.log('Same Funding rate');
            }
        } 

    // getfunding(exchangeIndex, aDataHandler){
    //     // console.log(this.future)
    //     setInterval(this.getFundingRates.bind(this), 5*1000, exchangeIndex, aDataHandler);
    // }

}

module.exports = CcxtSource