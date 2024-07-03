const User = require("../models/user")

exports.authorize = async(req, res, next) => {
try {
    const user = await User.findById("66844c37a16cb80c2bff9a43");
    console.log((user));
    if(user){
         req.user = user;
         next();
    }
   
} catch (error) {
    console.log(error)
}

}