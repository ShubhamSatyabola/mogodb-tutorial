

const express = require('express');

const sellerController = require('../controllers/admin');
const {authorize} = require("../middleware/authMiddleware")
const router = express.Router();

router.get('/get-product',authorize, sellerController.getAddProduct)

router.post('/post-product',authorize, sellerController.postAddProduct)


router.put("/update-product", authorize, sellerController.updateProduct);

router.delete(
  "/delete-product/:productId",
  authorize,
  sellerController.postDeleteProduct
);




module.exports = router;