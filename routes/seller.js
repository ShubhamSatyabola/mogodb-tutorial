

const express = require('express');

const sellerController = require('../controllers/admin');

const router = express.Router();

router.get('/get-product', sellerController.getAddProduct)

router.post('/post-product', sellerController.postAddProduct)


router.put("/update-product", sellerController.updateProduct);

router.delete('/delete-product/:productId', sellerController.postDeleteProduct)




module.exports = router;