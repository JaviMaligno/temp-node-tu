var http = require('http');

// Creating a server
http.createServer().on("conection", (socket) => { //https://en.wikipedia.org/wiki/Network_socket
    console.log("New connection")
});

http.createServer(function (req, res) {

// Write response as Html(text)

res.writeHead(200, {'Content-Type': 'text/html'}); //The first argument of the res.writeHead() method is the status code, 200 means that all is OK, the second argument is an object containing the response headers.

// Writing static text

res.end('Hello World');

// Server listening on port number 4200

}).listen(4200);