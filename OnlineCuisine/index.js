const express = require('express');
const router = require('./Routes/route.js')
const bodyParser = require('body-parser')
const app = express();
const path = require("path");
const view=require('./Controlers/control');
const rout=express.Router();
app.use(bodyParser.urlencoded())
app.use(express.static("Views"));
app.use(express.static("palak"));
const port =  process.env.PORT||2000;
app.use('/',router.rout);
app.listen(port,()=>{
    console.log("Connection Successfull at port http://localhost:" +port)
});