const express = require('express');
const path = require('path');
const { Script } = require('vm');
const w = require('../web_new');
const acc = w.contract;

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const viewAccount = async (req, res) => {
    const address = req.body.add;
    const a = await acc.methods.totalSupply().call({ from: address });
    res.send(a);
}

const transfer = async (req, res) => {
    //     const address = req.body.add;
    //     const address2 = req.body.address2;
    //     const token = req.body.token;
    //     const b = await acc.methods.transfer(address2, token).send({ from: address });
    //     res.send(b);

    add = "0x930c1e8A665A91Ce9521a4bCcF71aFAd5e19EdE8";
    add2 = "0x760f772BA73178C103ed86941136999D881D462b";
    const _token = 5;
    PRIVATE_KEY = "7851239b47f1cf0dcd9cdf156da0d6b59b6dabdaedff6a7a9f6dc771031d612a";

    const cont1 = require('../build/contracts/ERC20Basic.json');
    const Contract_address = cont1.networks['5777'].address;
    const Contract_ABI = cont1.abi;
    const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
    const _nonce = web3.eth.getTransactionCount(add);
    const transfer1 = await acc.methods.transfer(add , add2, _token);
    const data = transfer1.encodeABI();

    const transaction =
    {
        from: add,
        nonce: _nonce,
        gasPrice: "2000000",
        gas: "1000000",
        to: add2,
        data: data,
        value: _token,
    };
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    console.log("Signed Transaction ", signedTx);

    const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Reciepient Transaction ", reciept);
    res.send(reciept);
}

const balanceOf = async (req, res) => {
    const address = req.body.add;
    const c = await acc.methods.balanceOf(address).call({ from: address });
    res.send(c);
}

const mint = async (req, res) => {
    const address = req.body.address;
    const token = req.body.token;
    const d = await acc.methods.mint(token).send({ from: address });
    res.send(d);
}
const burn = async (req, res) => {
    const address = req.body.add;
    const token = req.body.token;
    const d = await acc.methods.burn(token).send({ from: address });
    res.send(d);
}

const approve = async (req, res) => {
    const address = req.body.add;
    const address2 = req.body.address2;
    const token = req.body.token;
    const d = await acc.methods.approve(address2, token).send({ from: address });
    res.send(d);
}

const allowance = async (req, res) => {
    const address = req.body.add;
    const address2 = req.body.address2;
    const d = await acc.methods.allowance(address, address2).call({ from: `${address}` });
    res.send(d);
}

const transferFrom = async (req, res) => {

    // add=req.body.add;
    // add2=req.body.add2;
    // const _token = req.body.token;
    // PRIVATE_KEY = req.body.pk;
    add = "0x8a4898b9d56C2a3Aeaf2b59bFa708AE52c80a07B";
    add2 = "0x00352d520aa7f9eFd8A16B643a543df98F896164";
    const _token = 5;
    PRIVATE_KEY = "01bcc1b895711f6a28ecafb0a6792112e5bbeec5853580a52b08cf064eb91558";

    const cont1 = require('../build/contracts/ERC20Basic.json');
    const Contract_address = cont1.networks['5777'].address;
    const Contract_ABI = cont1.abi;
    const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
    const _nonce = web3.eth.getTransactionCount(add);
    const transfer1 = await contract.methods.transferFrom(add, add2, _token);
    const data = transfer1.encodeABI();

    const transaction =
    {
        from: add,
        nonce: _nonce,
        gasPrice: "2000000",
        gas: "1000000",
        to: add2,
        data: data,
        value: _token,
    };
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    console.log("Signed Transaction ", signedTx);

    const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Reciepient Transaction ", reciept);
    res.send(reciept);
}


//=================================================


module.exports = { viewAccount, transfer, balanceOf, mint, burn, approve, allowance, transferFrom };
