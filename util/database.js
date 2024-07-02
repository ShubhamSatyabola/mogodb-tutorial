const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

let db;
exports.mongodbConnect = callback => {
    // console.log(process.env.MongoDbUrl);
    MongoClient.connect(process.env.MongoDbUrl)
      .then((client) => {
        console.log("user connected");
        db = client.db();
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
    
}
exports.getDb = ()=>{
    if(db){
        return db
    }
}

 