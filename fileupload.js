//Upload a file using an html form 
var http = require('http');
var formidable = require('formidable');
//When the file is uploaded and parsed, it gets placed on a temporary folder on your computer.
//The path to this directory can be found in the "files" object, passed as the third argument in the parse() method's callback function.
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') { //the file will be uploaded to /fileupload (see form action)
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath; //temporary folder
        //console.log(oldpath);
        var newpath = 'C:/Users/javia/' + files.filetoupload.originalFilename; //location to save the file
        //console.log(newpath);
        fs.rename(oldpath, newpath, function (err) { //changes path
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
          });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'}); //https://www.w3schools.com/html/html_forms.asp
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);