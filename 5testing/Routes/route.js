const control=require('../Controlers/control.js');
const express=require('express');
const rout=express.Router();

rout.get('/',control.viewAccount);
rout.get('/balanceOf',control.balanceOf);
rout.post('/transfer',control.transfer);
// rout.post('/',control.logInPost);
module.exports= {rout};