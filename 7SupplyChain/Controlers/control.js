const express = require('express');
const path = require('path');
const w = require('../web_new');
const acc = w.contract;
let hash;

const A_manufactureRequest = async (req, res) => {
    // const address = ;
    let _partName = "Wheel" ;
    let _quantity =2; 
    let _date = '22June2022'; 
    let _price = 1 ; 
    let _nameOfYourCompany = 'Lambourgini';
    await acc.methods.A_manufactureRequest(_partName ,_quantity ,_date ,_price ,_nameOfYourCompany).send({ from: "0x3B117F9902E6B259ACFB15fDb43A4Aa708d1892A",gas: 1000000});
    const a1 = await acc.methods.A_manufactureRequest(_partName ,_quantity ,_date ,_price ,_nameOfYourCompany).call({ from: "0x3B117F9902E6B259ACFB15fDb43A4Aa708d1892A",gas: 1000000});
    hash = a1;
    console.log(a1);
    res.sendFile(path.join(__dirname,"../frontend/index.html" ));
    // res.send(a1);
}


const transfer = async (req, res) => {
    const address = req.body.address;
    const address2 = req.body.address2;
    const token = req.body.token;
    const b = await acc.methods.transfer(address2, token).send({ from: `${address}` });
    res.send(b);
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
module.exports = { A_manufactureRequest, transfer, balanceOf, mint, burn, approve, allowance, transferFrom , hash};