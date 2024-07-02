const path = require('path');
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const mongodbConnect = require('./util/database');


const app = express();
app.use(cors());

//db28hJM1chso019J   == passmongo

const sellerRoutes = require('./routes/seller')


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(sellerRoutes);

mongodbConnect.mongodbConnect(()=>{
    //console.log(client)
    //console.log('user connected')
    app.listen(3000)
})



