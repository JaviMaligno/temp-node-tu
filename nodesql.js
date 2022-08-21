var mysql = require('mysql');

var con = mysql.createConnection({
  host: "DESKTOP-6CCQDG1",
  user: "DESKTOP-6CCQDG1\javia",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
