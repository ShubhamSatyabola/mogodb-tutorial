const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

let db;
exports.mongodbConnect = callback => {
    
    MongoClient.connect('mongodb+srv://id and  pass@mongotesting.qkzbdhh.mongodb.net/product?retryWrites=true&w=majority')
    .then(client=>{
        console.log('user connected')
        db = client.db()
        callback()
    })
    .catch(err=>{
        console.log(err)
    })
    
}
exports.getDb = ()=>{
    if(db){
        return db
    }
}

 