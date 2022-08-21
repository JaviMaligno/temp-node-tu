var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ja683:76321jav@cluster0.l2in6rm.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    //If you try to insert documents in a collection that do not exist, MongoDB will create the collection automatically.
    //var myobj = { name: "Company Inc", address: "Highway 37" };
    //dbo.collection("customers").insertOne(myobj, function(err, res) {
      //if (err) throw err;
      //console.log("1 document inserted");
      //db.close();
      /* var myobj = [
        { name: 'John', address: 'Highway 71'},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Hannah', address: 'Mountain 21'},
        { name: 'Michael', address: 'Valley 345'},
        { name: 'Sandy', address: 'Ocean blvd 2'},
        { name: 'Betty', address: 'Green Grass 1'},
        { name: 'Richard', address: 'Sky st 331'},
        { name: 'Susan', address: 'One way 98'},
        { name: 'Vicky', address: 'Yellow Garden 2'},
        { name: 'Ben', address: 'Park Lane 38'},
        { name: 'William', address: 'Central st 954'},
        { name: 'Chuck', address: 'Main Road 989'},
        { name: 'Viola', address: 'Sideway 1633'}
      ];
      dbo.collection("customers").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close(); */
        /*var myobj = [
            { _id: 154, name: 'Chocolate Heaven'},
            { _id: 155, name: 'Tasty Lemon'},
            { _id: 156, name: 'Vanilla Dream'}
          ];
          dbo.collection("products").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log(res);
            db.close(); */
    var dbo = db.db("mydb");
    dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    });
    dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).limit(5).toArray(function(err, result) {
       //The second parameter of the find() method is the projection object that describes which fields to include in the result.
       //You are not allowed to specify both 0 and 1 values in the same object (except if one of the fields is the _id field). If you specify a field with the value 0, all other fields get the value 1, and vice versa
       // {_id:0} gives the same. So only specify the ones that appear or the ones that do not
        if (err) throw err;
        console.log(result);
        console.log(result[2].address);
      });

    var query = { address: "Park Lane 38" };
    dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
    //Find documents where the address starts with the letter "S":
    var query = { address: /^S/ };
    dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
    //Sort the result alphabetically by name:
    var mysort = { name: 1 };
  dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
  var myquery = { address: 'Mountain 21' };
  dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });

  var myquery = { address: /^O/ };
  dbo.collection("customers").deleteMany(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.deletedCount + " document(s) deleted"); //https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteMany/
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await
  });
  //to delete the collection
  /*dbo.collection("customers").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });*/
  //alternatively
  /*dbo.dropCollection("customers", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });*/
  var myquery = { address: "Valley 345" };
  var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
  //When using the $set operator, only the specified fields are updated:
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

  var myquery = { address: /^S/ };
  var newvalues = {$set: {name: "Minnie"} };
  dbo.collection("customers").updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.modifiedCount + " document(s) updated");
    db.close(); //only close at the end
  });


});
   