const Web3 = require('web3');
const conf = require('./build/contracts/ERC20Basic.json');
const Contract_address = conf.networks['5777'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
module.exports = { contract };

















































































// ===========================================================
// const Tx = require('ethereumjs-tx').Transaction;
// const acc1 = '0xa94f0b4f050639E92D5EA196e8e42AAFd8502268';
// const acc2 = '0x083EDC46AF728e05948dac0f168eE74A1dC3dDb4';
// const privateKey1 = Buffer.from('1dead58bd0f80a88f27252dac2fa3d253d835eabccadf2533d33f717df427797' , 'hex');
// const privateKey2 = Buffer.from('97a6541f285d01e96835ecc74b84a011e15c8612dc10461c033bc99348204b26' , 'hex');
// web3.eth.getTransactionCount(acc1, (err, txCount) => {
//     //build transcation
//     const txObject = {
//         nonce: web3.utils.toHex(txCount),
//         to: acc2,
//         value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
//         gasLimit: web3.utils.toHex(21000),
//         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
//     }
//     // console.log(txObject);
//     //sign the transaction
//     const tx = new Tx(txObject);
//     tx.sign(privateKey1);
//     const serializedTransaction = tx.serialize();
//     const raw = '0x' + serializedTransaction.toString('hex')
//     //broadcast the transaction
//     web3.eth.sendSignedTransaction(raw , (err , txHash)=>{
//         console.log('txHash : ' , txHash);
//     })
// web3.eth.getBalance(acc2 ,(err , bal)=>{
//     console.log('acc2 :' , web3.utils.fromWei(bal , 'ether'));
// })
