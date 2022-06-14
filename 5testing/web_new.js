const Web3 = require('web3');
const conf = require('./build/contracts/ERC20Basic.json');
const Contract_address = conf.networks['5777'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contract = new web3.eth.Contract(Contract_ABI,Contract_address);
module.exports= {contract};

       


