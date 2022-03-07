"use strict";

class TimeStruct {

    constructor() {
        this.sec = 0;
        this.nsec = 0;
    }

    initFromSecMicros(aSec, aMicrosec) {
        this.sec = aSec;
        this.nsec = aMicrosec * 1000;
    }

    initFromMicrotime(aList) {
        this.sec = aList[0];
        this.nsec = aList[1] * 1000;
    }

    initFromNodejsDate(aDate) {
        this.sec = Math.floor(aDate/1000);
        this.nsec = (aDate - this.sec * 1000)*1000000;
    }

    copyTimeStruct(aTs) {
        this.sec = aTs.sec;
        this.nsec = aTs.nsec;
    }

    getIntDateNoAlloc(aDateTime) {
        aDateTime.setTime(this.sec * 1000 + Math.floor(this.nsec/1000000));
        return (aDateTime.getUTCFullYear() * 10000 + ((aDateTime.getUTCMonth()+1)*100) +
            aDateTime.getUTCDate());
    }

    getIntDate() {
        var myDate = new Date();
        myDate.setTime(this.sec * 1000 + Math.floor(this.nsec/1000000));
        return (myDate.getUTCFullYear() * 10000 + ((myDate.getUTCMonth()+1)*100) +
            myDate.getUTCDate());
    }

    getDoubleTimeNoAlloc(aDateTime) {
        aDateTime.setTime(this.sec * 1000 + Math.floor(this.nsec/1000000));
        return (aDateTime.getUTCHours()*10000000 + aDateTime.getUTCMinutes()*100000 + 
            aDateTime.getUTCSeconds()*1000 + this.nsec/1000000);
    }

    getDoubleTime(aDateTime) {
        var myDate = new Date();
        myDate.setTime(this.sec * 1000 + Math.floor(this.nsec/1000000));
        return (myDate.getUTCHours()*10000000 + myDate.getUTCMinutes()*100000 + 
            myDate.getUTCSeconds()*1000 + this.nsec/1000000);
    }
}

module.exports = TimeStruct;