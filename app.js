const path = require('path');
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

// const mongodbConnect = require('./util/database');
 const mongoose = require("mongoose")

const app = express();
app.use(cors());



const sellerRoutes = require('./routes/seller')
const userRoute  = require('./routes/user')
const cartRoute = require("./routes/cart")
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(sellerRoutes);
app.use(userRoute)
app.use(cartRoute)


mongoose.connect(process.env.MongoDbUrl).then(() => app.listen(3000)).catch(err=>console.log(err));

// connection changed to mongoose ODM
// mongodbConnect.mongodbConnect(()=>{
    //console.log(client)
    //console.log('user connected')
//     app.listen(3000)
// })



