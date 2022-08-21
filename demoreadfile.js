var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('demofile.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();

  });
}).listen(8080);

var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!\r\n', function (err) {// "/n" should be fine, but some editors can't read it
  if (err) throw err; //adds content if the file exists
  console.log('Saved!');
});

fs.open('mynewfile2.txt', 'w', function (err, file) { // w for writing
  if (err) throw err; // opens new empty file, throws error if it can't https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
  console.log('Saved!');
});

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) { //opens a new file with content,  replaces existing files
    if (err) throw err;
    console.log('Saved!');
  });

  
fs.unlink('mynewfile2.txt', function (err) {//deletes fille
    if (err) throw err;
    console.log('File deleted!');
  });

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
  });