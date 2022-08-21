var http = require('http');
var dt = require('./myfirstmodule');
var url = require('url'); //to easily split the query string into readable parts

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<p>The date and time are currently: " + dt.myDateTime()+"</p>");
  res.write("<p>"+req.url+"</p>"); //has a req argument that represents the request from the client, as an object (http.IncomingMessage object).
                    //This object has a property called "url" which holds the part of the url that comes after the domain name
    var q = url.parse(req.url, true).query; //https://stackoverflow.com/questions/33041449/what-is-the-meaning-of-question-mark-in-a-url-string
    var txt = q.year + " " + q.month; //http://localhost:8080/?year=2017&month=July to return 2017 July
  res.end(txt);
}).listen(8080);