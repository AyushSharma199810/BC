// from 0xFce453aA73177E63f24530ea106ee75d478a5cb1
// to 0x06FFdb895116eAccbEd57460C6EE1693eb13c3Bf

const express = require("express");
const Web3 = require("web3");
const accounts = require("web3-eth-accounts");

// const model = require("../Models/models");
// const Provider = require('@truffle/hdwallet-provider');
// const address1 = '0xFce453aA73177E63f24530ea106ee75d478a5cb1';
// const privateKey = '61f84609b0c5c7cf36f01eb84af270c109bfcdd790db99af5fc4bec2315bc313';
// const provider1 = 'https://rinkeby.infura.io/v3/cba9c1d8b5ab4c2193bbd20ed721f374';
// const web3 = new Web3(provider1);

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const cons = require("../build/contracts/ERC20Basic.json");
const ContractAddress = cons.networks[5777].address;
const ABi = cons.abi;
const cont1 = new web3.eth.Contract(ABi, ContractAddress);
const PRIVATE_KEY = "df9147e8af9fdf8ab8fbb6a00708b508889beb63e5a717ff7b0eb35e23a21c51";

const transfer = async (req, res) => {
    // const address2 = await address();
    const _value = 5;
    console.log(_value);
    const _nonce = await web3.eth.getTransactionCount("0x22A18aFe8c499ECf7A3b7507AD179675379EE882");
    const transfer1 = await cont1.methods.transfer('0x52999b9e5F0111ba4aA369aE8683da17D53Be717', _value);
    const data = transfer1.encodeABI();
    const transaction =
    {
        from: '0x22A18aFe8c499ECf7A3b7507AD179675379EE882',
        nonce: _nonce,
        gasPrice: "200000",
        gas: "300000",
        to: ContractAddress,
        data: data,
        _value,

    };
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(reciept);
    res.send(reciept);
    const MyEvent = reciept.logs[0].topics;
    console.log(MyEvent);
    console.log(signedTx);
    res.send(signedTx);
};


const balanceOf = async (req, res) => {
    balance = await cont1.methods.balanceOf("0x22A18aFe8c499ECf7A3b7507AD179675379EE882").call({ from: "0x22A18aFe8c499ECf7A3b7507AD179675379EE882" });
    res.send(balance);
    console.log(balance);
};

module.exports = { transfer, balanceOf, };