// Now we are going to use the event class here so that we can export only the necessary functionality
const EventEmitter = require('events'); 
const emitter = new EventEmitter();

//this module is going to be responsible for emiting signals

//we create a class to include the functionality of EventEmitter and others
class Logger extends EventEmitter { //extends is optional, this way we declare Logger as a child of EventEmitter
    log(message) { //we don't need function keyword inside class definition
    
        console.log(message); 
        //we use "this" instead of emitter, because we use the methods from this class (because it's extending EventEmitter)
        this.emit("messageLogged", {id  : 1, url : "http://"}); //cut it from app.js
    }
}

module.exports = Logger;  //now we export the Logger class