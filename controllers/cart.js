const User = require("../models/user");
const Product = require('../models/product')

exports.addToCart = async(req, res , next) => {
    try {
         const productId = req.body._id;
      //   console.log(productId)
         const product = await Product.fetchById(productId);
     //    console.log(product);
         const cartItem = await req.user.addToCart(product);
       //  console.log(cartItem);
         res.status(201).json({message:"successfully", cartItem})
    }
    catch (err) {
        console.log(err);
        }
   

    
}

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
     res.status(200).json(cart);
   
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCart = async (req,res,next) =>{
    const prodId = req.params.id ;
    //console.log(prodId, "prodId");
    try {
        const cart = await req.user.deleteCartItem(prodId);
        res.status(200).json({message:"successfully deleted", cart})
        } catch (err) {
            console.log(err);
            }


}

exports.createOrder = async (req, res, next) => {
 
  try {
    const cart = await req.user.createOrder();
    res.status(201).json({ message: "successfully deleted" });
  } catch (err) {
    console.log(err);
  }
};