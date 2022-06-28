const express = require('express');
const path = require('path');
const w = require('../web_new');
const acc = w.contract;
let manufactureOrderHash;

const main = (req , res) =>{
    res.render('main');
}
const A_manufacturePost = async (req, res) => {
    res.render('A_manufacturePost');
}

const A_manufactureGet = async (req, res) => {
      let _address = req.body.address;
      let _partName = req.body.partName ;
      let _quantity =req.body.quantity; 
      let _date = req.body.date; 
      let _price = req.body.price ; 
      let _nameOfYourCompany = req.body.nameOfYourCompany;
      await acc.methods.A_manufactureRequest(_partName ,_quantity ,_date ,_price ,_nameOfYourCompany).send({ from: _address,gas: 1000000});
      const hash = await acc.methods.A_manufactureRequest(_partName ,_quantity ,_date ,_price ,_nameOfYourCompany).call({ from: _address,gas: 1000000});
      manufactureOrderHash =hash;
      res.render('A_manufactureGet',{hash: hash});
}


const J_ownerOfHashGet = async (req, res) => {
    let _address = req.body.address;
    let _orderHash = req.body.orderHash;
    const hash = await acc.methods.J_ownerOfHash(_orderHash).call({ from: _address });
    let data ={
        Owner_Address : hash._ownerAddress,
        Owner_Name: hash._ownerName,
        Product_Name : hash._productName,
        Product_Status : hash._productStatus,
        Payment_Status :hash._paymentStatus,
        Manufacture_Order_Hash:manufactureOrderHash
    }
    res.render('A_J_ownerOfHashGet',data);
}

const balanceOf = async (req, res) => {
    const address = req.body.address;
    const c = await acc.methods.balanceOf(address).call({ from: `${address}` });
    res.send(c);
}

const mint = async (req, res) => {
    const address = req.body.address;
    const token = req.body.token;
    const d = await acc.methods.mint(token).send({ from: `${address}` });
    res.send(d);
}
const burn = async (req, res) => {

    const token = req.body.token;
    const d = await acc.methods.burn(token).send({ from: `${address}` });
    res.send(d);
}

const approve = async (req, res) => {
    const address = req.body.address;
    const address2 = req.body.address2;
    const token = req.body.token;
    const d = await acc.methods.approve(address2, token).send({ from: `${address}` });
    res.send(d);
}

const allowance = async (req, res) => {
    const address = req.body.address;
    const address2 = req.body.address2;
    const d = await acc.methods.allowance(address, address2).call({ from: `${address}` });
    res.send(d);
}

const transferFrom = async (req, res) => {
    const address = req.body.address;
    const address2 = req.body.address2;
    const token = req.body.token;
    const e = await acc.methods.transferFrom(address, address2, token).send({ from: `${address2}` });
    res.send(e);
}
module.exports = { main, A_manufacturePost , A_manufactureGet , J_ownerOfHashGet , balanceOf, mint, burn, approve, allowance, transferFrom };