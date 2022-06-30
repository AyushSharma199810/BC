const control=require('../Controlers/control.js');
const express=require('express');
const rout=express.Router();

rout.get('/',control.main);
rout.get('/A_manufacturePost',control.A_manufacturePost);
rout.post('/A_manufactureGet',control.A_manufactureGet);
rout.post('/J_ownerOfHashGet',control.AJ_ownerOfHashGet);
rout.post('/AC_paymentToSupplierByManufacturer',control.AC_paymentToSupplierByManufacturer);
rout.get('/B_supplierResponse',control.B_supplierResponse);
rout.post('/B_supplierResponseGet',control.B_supplierResponseGet);
rout.post('/BJ_ownerOfHashGet',control.BJ_ownerOfHashGet);
rout.post('/K_manufacureBalance',control.K_manufacureBalance);
module.exports= {rout};