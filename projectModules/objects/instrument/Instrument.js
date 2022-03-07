"use strict";

class Instrument {
    #token
    #exchange
    #lotSize
    #instrType
    #tickSize
    #currency
    #expiry
    
    constructor() {
    
    }

    getToken() {
        return this.#token;
    }

    getExchange() {
        return this.#exchange;
    }

    getLotSize() {
        return this.#lotSize;
    }

    getInstrType() {
        return this.#instrType;
    }

    getTickSize() {
        return this.#tickSize;
    }

    getCurrency() {
        return this.#currency;
    }

    getExpiry() {
        return this.#expiry;
    }
}

module.exports = Instrument;