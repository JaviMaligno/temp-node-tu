 //MongoDB is not a relational database, but you can perform a left outer join by using the $lookup stage.

//The $lookup stage lets you specify which collection you want to join with the current collection, and which fields that should match.

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ja683:76321jav@cluster0.l2in6rm.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    //MongoDB waits until you have created a collection (table), with at least one document (record) before it actually creates the database (and collection).
    var dbo = db.db("mydb");

    //dbo.createCollection("orders", function(err, res) {
      //if (err) throw err;
    //});
    var order = { _id: 2, product_id: 158, status: 1 };
    dbo.collection("orders").insertOne(order, (err, res) => {
        if (err) throw err;
        console.log(res)
    });

    var products = [
        { _id: 158, name: 'Chocolate Heaven' },
        { _id: 159, name: 'Tasty Lemons' },
        { _id: 160, name: 'Vanilla Dreams' }
      ]

    dbo.collection("products").insertMany(products, (err, res) => {
        if (err) throw err;
        console.log(res);
  });

  dbo.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'product_id',
         foreignField: '_id',
         as: 'orderdetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});