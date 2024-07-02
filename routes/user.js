const router = require("express").Router();
const {addUser , fetchUserById} = require("../controllers/user")
router.post("/addUser" , addUser);
router.get("/fetchUser/:id" , fetchUserById);

module.exports = router