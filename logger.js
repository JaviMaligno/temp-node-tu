// create a module for logging messages
var url = "http://mylogger.io/log"; //fake, but there arewebsite  that provides logging services
// we would send an http request to this url
function log(message) {
    // Send HTTP request here (we don't actually do it now)
    console.log(message); //this is the global one
}

module.exports.log = log; //we are adding an element to the exports field of module
                        //this element is the function log that we have defined
                        //this allows to export it and use it in other files
// module.exports.endPoint = url; //you can change the name with which it is exported                
// we don't need to export everything, we want to keep the variable private
// also exports.log = log; and module.exports = log; but the last one is more intricate
// with the last one we simply call logger instead of logger.log

// console.log(__filename); //logs complete path when we call app.js
// console.log(__dirname); //logs path to directory

module.exports = Logger; //export everything with its name



