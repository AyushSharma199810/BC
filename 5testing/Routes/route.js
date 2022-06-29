const control=require('../Controlers/control.js');
const express=require('express');
const rout=express.Router();

// rout.get('/',control.viewAccount);
rout.get('/balanceOf',control.balanceOf);
rout.post('/transfer',control.transfer);
// rout.post('/mint',control.mint);
// rout.post('/burn',control.burn);
// rout.post('/approve',control.approve);
// rout.get('/allowance',control.allowance);
// rout.post('/transferFrom',control.transferFrom);
// rout.get('/accounts',control.accounts);
module.exports= {rout};