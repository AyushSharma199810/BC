const Web3 = require('web3');
const conf = require('../build/contracts/ERC20Basic.json');
const Contract_address = conf.networks['5777'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);





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

    const address = req.body.address;
    const address2 = req.body.address2;
    const pk1 = (req.body.pk1).toString();
    const token = req.body.token;

    //     // //================================================


        const Tx = require('ethereumjs-tx').Transaction;
    //     const acc1 = req.body.address;
    //     const acc2 = req.body.address2;
        const privateKey1 = Buffer.from(pk1, 'hex');

    //     // web3.eth.getTransactionCount(acc1, (err, txCount) => {

    //     //     //build transcation

    //     //     const txObject = {
    //     //         nonce: web3.utils.toHex(txCount),
    //     //         to: acc2,
    //     //         value: web3.utils.toHex((token)),
    //     //         gasLimit: web3.utils.toHex(21000),
    //     //         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    //     //         data : Contract_ABI
    //     //     }

    //     //     //sign the transaction

    //     //     const tx = new Tx(txObject);
    //     //     tx.sign(privateKey1);
    //     //     const serializedTransaction = tx.serialize();
    //     //     const raw = '0x' + serializedTransaction.toString('hex');

    //     //     //broadcast the transaction

    //     //     web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    //     //         console.log('txHash : ', txHash);
    //     //     })
    //     //     web3.eth.getBalance(acc2, (err, bal) => {
    //     //         console.log('acc2 :', web3.utils.fromWei(bal, 'ether'));
    //     //     })


    //     // })

        // const e = await acc.methods.transferFrom(address, address2, token).send({ from: `${address2}` });
    //     // res.send(e);

        const networkId = web3.eth.net.getId();
        const tx = contract.method.transferFrom(address, address2, token);
    const gasLimit = await web3.utils.toHex(21000);
        const gasPrice = await web3.utils.toHex(web3.utils.toWei('10', 'gwei'));
    const data = Contract_ABI;
        const nonce = web3.eth.getTransactionCount(address);






        var rawTx = {
            nonce,
            gasPrice,
            gasLimit,
            to: address2,
            value: token,
            data
        }

        var tx1 = new Tx(rawTx);
        tx1.sign(privateKey1);

        var serializedTx = tx1.serialize();

    //     // console.log(serializedTx.toString('hex'));
    //     // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', console.log);
}


//=================================================


module.exports = { viewAccount, transfer, balanceOf, mint, burn, approve, allowance, transferFrom };
