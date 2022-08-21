//Now we're importing the class that we've save in a different file           
// import Logger from "./loggerclass"; //alternative syntax
const Logger = require('./loggerclass')
const logger = new Logger();

// Now we need to register a listener with the same emitter
logger.on("messageLogged", (arg) => { //arrow function, alternative notation
    console.log("Listener called", arg); 
})

logger.log("message");

// now we use the http module
const http = require('http');
const server = http.createServer(); //it has all the capabilities of EventtEmitter

server.on("conection", (socket) => { //https://en.wikipedia.org/wiki/Network_socket
    console.log("New connection")
}); //this should log "new connection" if you browse for localhost:3000
server.listen(3000);
console.log("Listenig on port 3000...");

//createServer may take a function as an argument that works with the request and response instead of the socket
const server1 = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello world");
        res.end();
    } //=== compares without forcing type conversion
    if (req.url === "/api/courses")  { //when typing localhost:420/api/courses
        res.write(JSON.stringify([1,2,3])); //convert array into json string because the argument of write must be a string
        res.end();
    }
}); 
server1.listen(420);
console.log("Listenig on port 420...");
