const express = require('express');
const path = require('path');
const { Script } = require('vm');
const w = require('../web_new');
const acc = w.contract;
const viewAccount = async (req, res) => {
   const a = await acc.methods.totalSupply().call({ from: '0x24ea22D1E3556c07909B4cc367E07a6da73e1A90' });
    res.send(a);
}

const transfer = async (req, res) => {
    const address = req.body.address;
    const token = req.body.token;
    const b = await acc.methods.transfer(address, token).send({ from: '0x24ea22D1E3556c07909B4cc367E07a6da73e1A90' });
    res.send(b);
}

const balanceOf = async (req, res) => {
    const address = req.body.address;
    const c = await acc.methods.balanceOf(address).call({ from: '0x24ea22D1E3556c07909B4cc367E07a6da73e1A90' });
    res.send(c);
}

const mint = async (req, res) => {
    const token = req.body.token;
    const d = await acc.methods.mint(token).send({ from: '0x24ea22D1E3556c07909B4cc367E07a6da73e1A90' });
    res.send(d);
}
const burn = async (req, res) => {
    const token = req.body.token;
    const d = await acc.methods.burn(token).send({ from: '0x24ea22D1E3556c07909B4cc367E07a6da73e1A90' });
    res.send(d  );
}

const approve = async (req, res) => {
    const address = req.body.address;
    const token = req.body.token;
    const d = await acc.methods.approve(address , token).send({ from: '0x24ea22D1E3556c07909B4cc367E07a6da73e1A90' });
    res.send(d  );
}

const allowance = async (req, res) => {
    const address = req.body.address;
    const address2 = req.body.address2;
    const d = await acc.methods.allowance(address , address2).call({ from: '0x24ea22D1E3556c07909B4cc367E07a6da73e1A90' });
    res.send(d);
}

module.exports = { viewAccount ,transfer , balanceOf , mint , burn , approve , allowance };
