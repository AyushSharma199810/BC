const Web3 = require('web3');
const conf = require('./build/contracts/ERC20Basic.json');
const Contract_address = conf.networks['5777'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contract = new web3.eth.Contract(Contract_ABI,Contract_address);
a=contract.eth.Contract.defaultAccount;
console.log(a);
// async function Abi() {


// const a = await web3.eth.getBalance("0x3B13762681129743B3f9af5D5A076f0e2f4C5931");
// console.log(a / 10 **18)

// }
// Abi();

       


