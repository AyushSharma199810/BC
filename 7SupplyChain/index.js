const express = require('express');
const router = require('./Routes/route.js')
const bodyParser = require('body-parser')
const app = express();
const view=require('./Controlers/control.js');
const rout=express.Router();
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static(__dirname+'/frontend'));
// app.use(express.static(__dirname+'/Controlers'));
// console.log(__dirname);
app.set('view engine', 'ejs')
const port =  process.env.PORT||2000;
app.use('/',router.rout);
app.listen(port,()=>{
    console.log("Connection Successfull at port http://localhost:" +port)
});



