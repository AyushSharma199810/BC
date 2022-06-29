const control=require('../Controlers/control.js');
const express=require('express');
const rout=express.Router();

rout.get('/',control.main);
rout.get('/A_manufacturePost',control.A_manufacturePost);
rout.post('/A_manufactureGet',control.A_manufactureGet);
rout.post('/J_ownerOfHashGet',control.J_ownerOfHashGet);
// rout.post('/burn',control.burn);
// rout.post('/approve',control.approve);
// rout.get('/allowance',control.allowance);
// rout.post('/transferFrom',control.transferFrom);
// rout.get('/accounts',control.accounts);
module.exports= {rout};