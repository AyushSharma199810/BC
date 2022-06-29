const control=require('../Controlers/control.js');
const express=require('express');
const rout=express.Router();
const {validator , result} = require('../Validators/validate')

rout.get('/',control.viewRes);
rout.get('/signUp',control.signUp);
rout.get('/home',control.home);
rout.get('/aboutUs',control.aboutUs);
rout.get('/drink',control.drink);
rout.get('/dessert',control.dessert);
rout.get('/food',control.food);
rout.post('/signUp',validator,control.result,control.signUpPost);
rout.post('/',control.logInPost);
module.exports= {rout};