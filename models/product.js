const getDb = require('../util/database').getDb
const {ObjectId} = require("mongodb")
class Product{
  constructor(name,cost,category,id){
    this.name = name
    this.cost = cost
    this.category = category
    this._id = new ObjectId(id)
  }
  save(){
    const db = getDb()
    let dbOp ;
      if(this._id){
        dbOp = db.collection('products').updateOne({_id:this._id},{$set: this})
      }
      else{
        dbOp = db.collection('products').insertOne(this)
      }

    return dbOp
    .then(result=>{
      console.log(result)
    })
    .catch(err=>console.log(err))
  }
  static fetchAll(){
    const db = getDb();
    // fin method in mongo doesn't return any data else it return cursor  and cursor is an object which help us to go through the whole document
    return db.collection('products')
    .find()
    .toArray()
  }
  static delete(id){
    const db = getDb();
    return db.collection('products')
    .deleteOne({_id: new ObjectId(id)}).then(res=>console.log(res)).catch(err=>{console.log(err)});
  }

}


module.exports = Product;
