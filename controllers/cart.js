const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

exports.addToCart = async (req, res, next) => {
  try {
    const productId = req.body._id;
    //   console.log(productId)
    const product = await Product.findById(productId);
    //    console.log(product);
    const cartItem = await req.user.addToCart(product);
    //  console.log(cartItem);
    res.status(201).json({ message: "successfully", cartItem });
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.cart.populate("items.productId");
    // console.log(cart);
    res.status(200).json(cart.items);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  const prodId = req.params.id;
  //console.log(prodId, "prodId");
  try {
    const updatedCartItems = req.user.cart.items.filter(
      (item) => item.productId.toString() !== prodId.toString()
    );
    req.user.cart.items = updatedCartItems;
    req.user.save();
    res.status(200).json({ message: "successfully deleted", updatedCartItems });
  } catch (err) {
    console.log(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    // const cart = await req.user.createOrder();
    const order = await req.user.cart.populate("items.productId");
    // console.log(order, "order");
    const orderArray = order.items.map((item) => {
      return { quantity: item.quantity, product: { ...item.productId._doc } };
    });
    // console.log(orderArray, "orderarray");
    const newOrder = new Order({
      user: {
        name: req.user.username,
        userId: req.user,
      },
      products: orderArray,
    });
    const result = await newOrder.save();
    await req.user.clearCart();
    console.log("saved", result);
    res.status(201).json({ message: "order placed" });
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res, next) =>{
  try {
    const orders = await Order.find({"user.userId": req.user._id});
    console.log(orders ,"fetched orders");
    res.status(200).json(orders);
  }
  catch (err) {
    console.log(err);
  }
}