const getDb = require('../util/database').getDb
class Product{
  constructor(name,cost,category){
    this.name = name
    this.cost = cost
    this.category = category
  }
  save(){
    const db = getDb()
    return db.collection('products')
    .insertOne(this)
    .then(result=>{
      console.log(result)
    })
    .catch(err=>console.log(err))
  }

}


module.exports = Product;
