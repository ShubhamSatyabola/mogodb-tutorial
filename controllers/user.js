const User = require('../models/user')

exports.addUser = async (req,res,next) =>{
    try{
        const {username , email, phone} = req.body;
        const user = new User(username , email, phone);
        await user.save()
        res.status(201).json({user , message:"added successfully"})
    }
    catch(err){
        throw new Error(`${err}`)
    }
}
 
exports.fetchUserById = async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id)
        res.status(200).json({user , message:"fetched successfully"})
    }
    catch(err){
       throw new Error(`${err}`);
    }
}