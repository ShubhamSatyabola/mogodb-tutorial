const Product = require('../models/product');

exports.getAddProduct = async (req, res, next) => {
    try{
      const products = await Product.findAll();
      res.status(201).json({allProducts: products})

    }catch(err){
      console.log(err)
    }
};

exports.postAddProduct = async (req, res, next) => {
  try{const name = req.body.name;
  const cost = req.body.cost;
  const category = req.body.category;
  const product = new Product(name,cost,category)
  product.save()
  .then(result=>{
    console.log(result,'saved')
    res.status(201).json({newProduct: result})
  })
  .catch(err=>console.log(err))
  
  //res.status(201).json({newProduct: data})
}catch(err){
  console.log(err)
}

};

  exports.postDeleteProduct = async(req, res, next) => {
    try{const prodId = req.params.productId;
    const product = await Product.findByPk(prodId);
    product.destroy()
    
    }catch(err){
      console.log(err)
    }
  }

