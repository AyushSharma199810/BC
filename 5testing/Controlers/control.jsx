const express = require('express');
const path = require('path');
const { Script } = require('vm');
const w = require('../web_new');
const acc = w.contract;

const viewAccount = async (req, res) => {
    const address = req.body.address;
   const a = await acc.methods.totalSupply().call({ from: `${address}` });
    res.send(a);
   
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
    const d = await acc.methods.approve(address2 , token).send({ from: `${address}` });
    res.send(d);
}

const allowance = async (req, res) => {
    const address = req.body.address;
    const address2 = req.body.address2;
    const d = await acc.methods.allowance(address , address2).call({ from: `${address}` });
    res.send(d);
}

const transferFrom = async (req, res) => {
    const address = req.body.address;
    const address2 = req.body.address2;
    const token = req.body.token;
    const e = await acc.methods.transferFrom( address , address2 , token).send({ from: `${address2}` });
    res.send(e);
}


module.exports = { viewAccount ,transfer , balanceOf , mint , burn , approve , allowance , transferFrom };
