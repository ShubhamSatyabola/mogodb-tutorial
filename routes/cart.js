const express = require("express");
const { authorize } = require("../middleware/authMiddleware");
const {addToCart, getCart, deleteCart, createOrder, getOrders} = require("../controllers/cart")
const router = express.Router();

router.get("/get-cart", authorize, getCart);

router.get("/get-orders", authorize, getOrders);

router.post("/post-cart", authorize, addToCart );

router.post("/order-cart", authorize,createOrder);

router.delete("/delete-cart-item/:id",authorize , deleteCart);


module.exports = router;
