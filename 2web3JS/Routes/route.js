const control=require('../Controlers/control.js');
const express=require('express');
const rout=express.Router();

rout.post('/',control.viewAccount);
// rout.get('/signUp',control.signUp);
// rout.post('/signUp',validator,control.result,control.signUpPost);
// rout.post('/',control.logInPost);
module.exports= {rout};