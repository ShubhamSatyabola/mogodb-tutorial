const express = require("express");

const sellerController = require("../controllers/admin");
const { authorize } = require("../middleware/authMiddleware");
const {addToCart, getCart, deleteCart, createOrder} = require("../controllers/cart")
const router = express.Router();

router.get("/get-cart", authorize, getCart);

router.post("/post-cart", authorize, addToCart );

router.post("/order-cart", authorize,createOrder);

router.delete("/delete-cart-item/:id",authorize , deleteCart);

module.exports = router;
