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

    //================================================


    const Tx = require('ethereumjs-tx').Transaction;



    const acc1 = '0xa94f0b4f050639E92D5EA196e8e42AAFd8502268';
    const acc2 = '0x083EDC46AF728e05948dac0f168eE74A1dC3dDb4';
    const privateKey1 = Buffer.from('1dead58bd0f80a88f27252dac2fa3d253d835eabccadf2533d33f717df427797', 'hex');
    const privateKey2 = Buffer.from('97a6541f285d01e96835ecc74b84a011e15c8612dc10461c033bc99348204b26', 'hex');
    web3.eth.getTransactionCount(acc1, (err, txCount) => {
        //build transcation
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: acc2,
            value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }
        // console.log(txObject);
        //sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey1);
        const serializedTransaction = tx.serialize();
        const raw = '0x' + serializedTransaction.toString('hex');
        //broadcast the transaction
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('txHash : ', txHash);
        })
        web3.eth.getBalance(acc2, (err, bal) => {
            console.log('acc2 :', web3.utils.fromWei(bal, 'ether'));
        })
    })




    //=================================================
    const address = req.body.address;
    const address2 = req.body.address2;
    const token = req.body.token;
    const e = await acc.methods.transferFrom(address, address2, token).send({ from: `${address2}` });
    res.send(e);
}


module.exports = { viewAccount, transfer, balanceOf, mint, burn, approve, allowance, transferFrom };
