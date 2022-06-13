var Web3 = require('web3');
var web3 = new Web3('HTTP://127.0.0.1:7545');

web3.eth.getBalance("0x3B13762681129743B3f9af5D5A076f0e2f4C5931").then((data)=>{
    console.log(data/1000000000000000000);
});
