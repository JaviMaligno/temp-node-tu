var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ja683:76321jav@cluster0.l2in6rm.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  //MongoDB waits until you have created a collection (table), with at least one document (record) before it actually creates the database (and collection).
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

//