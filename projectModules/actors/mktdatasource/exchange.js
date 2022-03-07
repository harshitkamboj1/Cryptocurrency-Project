"use strict";

const WebSocket = require('ws');

class Exchange {
    constructor(aUrl, aConnectedCallback, aDataHandler) {
        this.url = aUrl;
        this.connCallback = aConnectedCallback;
        this.dataHandler = aDataHandler;
        this.reconnTimerId = undefined;
        this.reconnInterval = 1000;
        this.connected = false;
    }

    connect() {
        this.socket = new WebSocket(this.url);
        console.log(new Date() + " created websocket for " + this.url);

        this.socket.on('open', () => {
            console.log(new Date() + ' connected to ' + this.url);
            this.connected = true;
            console.log("clearing timerid=" + this.timerId);
            clearTimeout(this.reconnTimerId);
            this.reconnInterval = 1000;
            this.connCallback();
        });
        
        this.socket.on('close', () =>{
            console.log(new Date() + ' disconnected from '+this.url);
            this.connected = false;
            this.connect();
        });
        
        this.socket.on('error', () =>{
            console.log(new Date() + ' got conn error from '+this.url);
        });

        this.socket.on('message', function handle(aData) {
            this.dataHandler.message(aData);
            // console.log("received " + aData);
        }.bind(this));

        this.reconnTimerId = setTimeout(function() {
            this.connect();
        }.bind(this), this.reconnInterval);
        console.log(new Date() + " scheduled reconnect with timerid=" + this.timerId);
        this.reconnInterval += this.reconnInterval;
    }

    send(aStr) {
        if (this.connected) {
            this.socket.send(aStr);
        }
    }
}

module.exports = Exchange;