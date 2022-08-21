var http = require('http');
var url = require('url');
var fs = require('fs');

//opens the requested file and returns the content to the client. If anything goes wrong, throw a 404 error
//http://localhost:8080/summer.html shows the summer.html file
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);


var rs = fs.createReadStream('./demofile.html'); //fires events when opening and closing a file
rs.on('open', function () {
  console.log('The file is open');
});

var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the eventhandler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');