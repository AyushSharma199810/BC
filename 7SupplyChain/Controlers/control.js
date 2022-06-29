const express = require('express');
const path = require('path');
const w = require('../web_new');
const acc = w.contract;
let savingHash = [];
let savingHashS =[];

const main = (req , res) =>{
    res.render('main');
}

const A_manufacturePost = async (req, res) => {
    let params ={
        hash : 0,
        Owner_Address : 0
    }
    res.render('A_manufacture',params);
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
      savingHash.push(hash);

      let params ={
        hash : savingHash,
        Owner_Address : 0
    }
      res.render('A_manufacture',params);
}

const AJ_ownerOfHashGet = async (req, res) => {
    let _address = req.body.address;
    let _orderHash = req.body.orderHash;
    const hash = await acc.methods.J_ownerOfHash(_orderHash).call({ from: _address });
    let data ={
        Owner_Address : hash._ownerAddress,
        Owner_Name: hash._ownerName,
        Product_Name : hash._productName,
        Product_Status : hash._productStatus,
        Payment_Status : hash._paymentStatus,
        hash : savingHash
    }
    res.render('A_manufacture',data);
}

const B_supplierResponse = async (req, res) => {
    let params ={
        hash : savingHash,
        order : "fromPost",
        hash2 : "",
        Owner_Address : ""
    }
    res.render('B_supplierResponse',params);
}
const B_supplierResponseGet = async (req, res) => {
    let _address = req.body.address;
    let _hash = req.body.hash;
    await acc.methods.B_supplierResponse(_hash).send({ from: _address,gas: 1000000});
    const hash = await acc.methods.B_supplierResponse(_hash).call({ from: _address,gas: 1000000});
    savingHashS.push(hash);
    savingHash.splice(savingHash.indexOf(_hash),1);
    let params ={
        hash2 : savingHashS,
        order : "Order Created",
        hash : savingHash ,
        Owner_Address : ""
    }
    res.render('B_supplierResponse' ,params );
}

const BJ_ownerOfHashGet = async (req, res) => {
    let _address = req.body.address;
    let _orderHash = req.body.orderHash;
    const hash = await acc.methods.J_ownerOfHash(_orderHash).call({ from: _address });
    let data ={
        Owner_Address : hash._ownerAddress,
        Owner_Name: hash._ownerName,
        Product_Name : hash._productName,
        Product_Status : hash._productStatus,
        Payment_Status : hash._paymentStatus,
        hash : savingHash,
        hash2 : savingHashS,
        order :""
    }
    res.render('B_supplierResponse',data);
}

const mint = async (req, res) => {
    const address = req.body.address;
    const token = req.body.token;
    const d = await acc.methods.mint(token).send({ from: `${address}` });
    res.send(d);
}

module.exports = { main, A_manufacturePost , A_manufactureGet , AJ_ownerOfHashGet , B_supplierResponse , B_supplierResponseGet , BJ_ownerOfHashGet};