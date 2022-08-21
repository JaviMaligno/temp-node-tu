function sayHello(name) {
    console.log(`Hello ${name}`); //'Hello ' + name
}

sayHello('Javi');
//console.log(window);  //error because this is not a browser, so it has no window object


//console is a global object, it can be accessed everywhere
//other global objects or functions  SEARCH WHAT THEY DO
// setTimeout();
// clearTimeout();
// setInterval();
// clearInterval();

// In browser, all those functions belong to the window object
// In node, they belong to global, so we can actually call them as global.setTimeOut(), etc

var message = 'hi'; // defining a (global) variable. 
console.log(global.message); // However it does not belong to global
// it logs an "undefined" message
console.log(message); // this one does log the message

//In general one should avoid the global scope because objects can be overridden. 
// It is better to use modules

// console.log(module);

const logger = require("./logger"); //to import modules from a file (whence ./ or ../ if in another folder) and save it as a constant 
//it is better to save the module as a constant (rather than a variable) to avoid overriding
//require("./logger.js")
console.log(logger);

logger.log("message");

// logger = 1;  //gives error because constant values can't be changed

const path = require('path'); //this way it assumes it is a built-in modulee
var pathObj = path.parse(__filename);
console.log(pathObj);

const os = require('os');
var totalMemory = os.totalmem(); //total memory of the machine
var freeMemory = os.freemem();  //free memory
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`); 
//This information was nos possible with JavaScript because it could only run on a browser

const fs = require('fs'); // module to handle files
// const files = fs.readdirSync("./"); //there are Sync versions of the methods, do not use them, asynchronous is better
// console.log(files); // logs a list of files in the current directory

fs.readdir("./", function(err, files) { //asynchronous methods take a function as a last argument
                                        //it is called a callback function, it takes an error and a array of string (filenames)
    //only one of the arguments will have a value
    if (err) console.log("Error", err);
    else console.log("Result", files)
}); 

//fs.readdir("&", function (err, files) { //simulate an error
 //   if (err) console.log("Error", err);
   // else console.log("Result", files)
//}); 

//var t = fs.readdir("./"); //No callback function gives error
//console.log(t);

const EventEmitter = require('events'); //an event is a signal that something has happpened in our applicaionn (e.g. a request)
// convention: capitalize each first letter to indicate that it's a class
const emitter = new EventEmitter(); //instance of the class (an object)

//Register a listener
emitter.on("messageLogged", function(arg) {// event name, callback function
    console.log("Listener called", arg); // we may omit arg if we don't emit the second argument below
})

//Raise an event
//has to be done after register a listener, otherwise nothing will happen
//iterates over all the listeners synchronously
emitter.emit("messageLogged", {id  : 1, url : "http://"});  //argument = name of the event, additional information to the client
//the information can be given as individual arguments as well
//the seconnd argument is optional

// Another listener
emitter.on("messageLogged", (arg) => { //arrow function, alternative notation
        console.log("Listener called", arg); 
    })

//We are going to reach both listeners now
emitter.emit("messageLogged", message);


const logger = require("./logger");
logger.log(message); //the previous listen will not be called by this
                    //because logger uses its own emitter object (we have created instances in both app and logger)

//we fix this s in applogger.js

