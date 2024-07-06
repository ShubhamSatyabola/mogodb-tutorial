const { ObjectId } = require('mongodb');
const Product = require('../models/product');

exports.getAddProduct = async (req, res, next) => {
    try{
      const userId = req.user
      const products = await Product.find({userId});
      console.log(products);
      res.status(201).json({allProducts: products})

    }catch(err){
      console.log(err)
    }
};


exports.postAddProduct = async (req, res, next) => {
  try{const name = req.body.name;
  const cost = req.body.cost;
  const category = req.body.category;
  const userId = req.user
  // console.log(req.user._id);
  const product = new Product({name,cost,category,userId})
  await product.save();
  
  
  res.status(201).json({newProduct: product})
}catch(err){
  console.log(err)
}

};

  exports.postDeleteProduct = async(req, res, next) => {
    try{const prodId = req.params.productId;
      console.log(prodId);
    await Product.findByIdAndDelete({_id:prodId});
    res.status(200).json({message:"deleted successfully"})
    }catch(err){
      console.log(err)
    }
  }



 exports.updateProduct = async (req, res, next) => {
   try {
     const name = req.body.name;
     const cost = req.body.cost;
     const category = req.body.category;
    const userId = req.user
     const _id = req.body._id;
     const product = await Product.findByIdAndUpdate(_id , {name,cost,category,userId},{new:true})
    //  const product = new Product(name,cost,category,_id)
    //  await product.save();
     res.status(201).json({updatedProduct: product})
   } catch (err) {
     console.log(err);
   }
 };