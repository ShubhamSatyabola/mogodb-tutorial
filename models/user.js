const getDb = require("../util/database").getDb;
const { ObjectId } = require("mongodb");

class User {
  constructor(username, email, phone, cart ,id , orders) {
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.cart = cart ;

    this._id = id ? new ObjectId(id) : null;
    this.orders = orders // [] of order

  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((res) => console.log(res))
      .catch((err) => console.log(error));
  }

  addToCart(product) {
    const db = getDb();
    
   
     const cartIndex = this.cart.items.findIndex(
        (item) => item.productId.toString() === product._id.toString()
      );
   
    console.log(cartIndex , "cartIndex");
    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]

    
    if(cartIndex >= 0){
      newQuantity = this.cart.items[cartIndex].quantity + 1 ;
      updatedCartItems[cartIndex].quantity = newQuantity
    }
    else{
      updatedCartItems.push({ productId:new ObjectId(product._id), quantity: newQuantity });
    }

    const updatedCart = {items:updatedCartItems};
    return db
      .collection("users")
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } })
  }

  getCart(){
    const db = getDb();
    const productIds = this.cart.items.map(item => item.productId)
    return db.collection('products').find({_id:{$in : productIds}}).toArray()
    .then(products => {
      return products.map(product => {
        return {
          ...product,
          quantity: this.cart.items.find(item => item.productId.toString() === product._id.toString()).quantity
        }
      })
    })
  }

  //delete-cart-item
  deleteCartItem(productId){
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString())
    const updatedCart = {items:updatedCartItems};
    return getDb()
    .collection('users')
    .updateOne({ _id: new ObjectId(this._id) }, { $set: { 
      cart: updatedCart
      } })
    }


  createOrder(){
    const updateOrders = [...this.orders]
    updateOrders.push({items:this.cart.items})
    return getDb()
    .collection('users')
    .updateOne({ _id: new ObjectId(this._id) }, { $set: {
      cart: {items:[]},
      orders:updateOrders
      } })
      
  }



  

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new ObjectId(id) })
      .next()
      .then((res) => res)
      .catch((err) => console.log(error));
  }
}

module.exports = User;
