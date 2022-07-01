const express = require('express');
const path = require('path');
const w = require('../web_new');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const acc = w.contract;
let savingHash = [];
let savingHashS =[];

const main = async(req , res) =>{
    res.render('main');
}

const A_manufacturePost = async (req, res) => {
    let params ={
        hash : 0,
        Owner_Address : 0,
        hash2 :savingHashS,
        balance : 0,
        manufacturerPartName : "0",
        manufactureName : "0",
        manufacturePrice : 0,
        manufactureDate : "0",
        manufactureQuantity : 0,
        toPrintPaymentStatus :false,
        hash3 : 0
    }
    res.render('A_manufacture',params);
}

const A_manufactureGet = async (req, res) => {
      let _address = req.body.address;
      let _partName = req.body.partName ;
      let _quantity =req.body.quantity; 
      let _date = req.body.date; 
      let _price = req.body.price ; 
      let _nameOfYourCompany = req.body.nameOfYourCompany;
      await acc.methods.A_manufactureRequest(_partName ,_quantity ,_date ,_price ,_nameOfYourCompany).send({ from: _address,gas: 1000000});
      const hash = await acc.methods.A_manufactureRequest(_partName ,_quantity ,_date ,_price ,_nameOfYourCompany).call({ from: _address,gas: 1000000});
      savingHash.push(hash);

      let params ={
        hash : savingHash,
        Owner_Address : 0,
        hash2 :savingHashS,
        balance : 0,
        manufacturerPartName : "0",
        manufactureName : "0",
        manufacturePrice : 0,
        manufactureDate : "0",
        manufactureQuantity : 0,
        toPrintPaymentStatus :false,
        hash3 : 0
    }
      res.render('A_manufacture',params);
}

const AJ_ownerOfHashGet = async (req, res) => {
    let _address = req.body.address;
    let _orderHash = req.body.orderHash;
    const hash = await acc.methods.J_ownerOfHash(_orderHash).call({ from: _address });
    let data ={
        Owner_Address : hash._ownerAddress,
        Owner_Name: hash._ownerName,
        Product_Name : hash._productName,
        Product_Status : hash._productStatus,
        Payment_Status : hash._paymentStatus,
        hash : savingHash,
        hash2 :savingHashS,
        balance : 0,
        manufacturerPartName : "0",
        manufactureName : "0",
        manufacturePrice : 0,
        manufactureDate : "0",
        manufactureQuantity : 0,
        toPrintPaymentStatus :false,
        hash3 : 0
    }
    res.render('A_manufacture',data);
}

const AC_paymentToSupplierByManufacturer = async(req , res) => {
    let _address = req.body.address;
    let _address2 = req.body.address2;
    let _price = (req.body.price)*10**18;
    await acc.methods.C_paymentToSupplierByManufacturer(_address2).send({ from: _address , value : _price , gas: 1000000});
    let params ={
        hash : savingHash,
        Owner_Address : "",
        hash2 :savingHashS,
        balance : 0,
        manufacturerPartName : "0",
        manufactureName : "0",
        manufacturePrice : 0,
        manufactureDate : "0",
        manufactureQuantity : 0,
        toPrintPaymentStatus :true,
        hash3 : 0
    }
    res.render('A_manufacture',params)

}

const K_manufacureBalance = async(req , res) => {
    let _address = req.body.address;
    let _balance = await web3.eth.getBalance(_address);
    _balance = _balance/10**18;
    let params ={
        hash : savingHash,
        Owner_Address : "",
        hash2 :savingHashS,
        balance : _balance,
        manufacturerPartName : "0",
        manufactureName : "0",
        manufacturePrice : 0,
        manufactureDate : "0",
        manufactureQuantity : 0,
        toPrintPaymentStatus :false,
        hash3 : 0
    }
    res.render('A_manufacture',params)

}


const D_creatingCar = async (req, res) => {
    let _address = req.body.address;
    let _productName = req.body.productName;
    let _productPrice = req.body.productPrice;
    let _date = req.body.date;
    let _quantity = req.body.quantity;
    
    await acc.methods.D_creatingCar(_address , _productName , _productPrice , _date , _quantity).send({ from: _address , gas: 1000000 });
    let hash = await acc.methods.D_creatingCar(_address , _productName , _productPrice , _date , _quantity).call({ from: _address });
    let params ={
        hash : 0,
        Owner_Address : 0,
        hash2 :savingHashS,
        balance : 0,
        manufacturerPartName : "0",
        manufactureName : "0",
        manufacturePrice : 0,
        manufactureDate : "0",
        manufactureQuantity : 0 ,
        hash3 : hash,
        toPrintPaymentStatus :false
    }
    res.render('A_manufacture',params)
}

const G_getCarDetails = async (req, res) => {
    let _address = req.body.address;
    let _hash = req.body.hash;
    await acc.methods.G_getCarDetails(_hash).send({ from: _address });
    let data = await acc.methods.G_getCarDetails(_hash).call({ from: _address });
    let params ={
        hash : savingHash,
        Owner_Address : "",
        hash2 :savingHashS,
        balance : 0,
        manufacturerPartName : data.manufacturerPartName,
        manufactureName : data.manufactureName,
        manufacturePrice : data.manufacturePrice/10**18,
        manufactureDate : data.manufactureDate,
        manufactureQuantity : data.manufactureQuantity,
        toPrintPaymentStatus :false,
        hash3 : 0
    }
    res.render('A_manufacture',params)
}
//====================================================B==============================================================================

const B_supplierResponse = async (req, res) => {
    let params ={
        hash : savingHash,
        order : "fromPost",
        hash2 : "",
        Owner_Address : "",
        balance :0
    }
    res.render('B_supplierResponse',params);
}
const B_supplierResponseGet = async (req, res) => {
    let _address = req.body.address;
    let _hash = req.body.hash;
    await acc.methods.B_supplierResponse(_hash).send({ from: _address,gas: 1000000});
    const hash = await acc.methods.B_supplierResponse(_hash).call({ from: _address,gas: 1000000});
    savingHashS.push(hash);
    // savingHash.splice(savingHash.indexOf(_hash),1);
    let params ={
        hash2 : savingHashS,
        order : "Order Created",
        hash : savingHash ,
        Owner_Address : "",
        balance :0
    }
    res.render('B_supplierResponse' ,params );
}

const BJ_ownerOfHashGet = async (req, res) => {
    let _address = req.body.address;
    let _orderHash = req.body.orderHash;
    const hash = await acc.methods.J_ownerOfHash(_orderHash).call({ from: _address });
    let data ={
        Owner_Address : hash._ownerAddress,
        Owner_Name: hash._ownerName,
        Product_Name : hash._productName,
        Product_Status : hash._productStatus,
        Payment_Status : hash._paymentStatus,
        hash : savingHash,
        hash2 : savingHashS,
        order :"",
        balance :0
    }
    res.render('B_supplierResponse',data);
}
const BK_manufacureBalance = async(req , res) => {
    let _address = req.body.address;
    let _balance = await web3.eth.getBalance(_address);
    _balance = _balance/10**18;
    let params ={
        balance : _balance,
        hash : savingHash,
        order : "fromPost",
        hash2 : "",
        Owner_Address : ""
    }
    res.render('B_supplierResponse',params)

}
//==========================================================E==========================================================================
const E_shippedCarToCustomer = async (req, res) => {
    let param ={
        hash : 0,
        Owner_Address :0,
        balance : 0
    }
    res.render('E_shippedCarToCustomer',param);
}
const EPR_shippedCarToCustomer = async (req, res) => {
    let _address = req.body.address;
    let _customerName = req.body.customerName;
    let _customerQuantity = req.body.customerQuantity;
    let _payingToManufacturer = req.body.payingToManufacturer;
    let _price = (req.body.price)*10**18;
   await acc.methods.E_shippedCarToCustomer(_customerName , _customerQuantity , _payingToManufacturer).send({ from: _address ,gas: 1000000, value : _price});
    // const hash = await acc.methods.E_shippedCarToCustomer(_customerName , _customerQuantity , _payingToManufacturer).call({ from: _address , gas: 1000000, value : _price });
    let param ={
        hash : 0,
        Owner_Address :0,
        balance : 0
    }
    res.render('E_shippedCarToCustomer',param);
}
const EJ_ownerOfHashGet = async (req, res) => {
    let _address = req.body.address;
    let _orderHash = req.body.orderHash;
    const hash = await acc.methods.J_ownerOfHash(_orderHash).call({ from: _address });
    let data ={
        Owner_Address : hash._ownerAddress,
        Owner_Name: hash._ownerName,
        Product_Name : hash._productName,
        Product_Status : hash._productStatus,
        Payment_Status : hash._paymentStatus,
        hash : 0,
        balance : 0
    }
    res.render('E_shippedCarToCustomer',data);
}

const EK_manufacureBalance = async(req , res) => {
    let _address = req.body.address;
    let _balance = await web3.eth.getBalance(_address);
    _balance = _balance/10**18;
    let params ={
        balance : _balance,
        hash : 0,
        Owner_Address : 0
    }
    res.render('E_shippedCarToCustomer',params)

}

module.exports = { main, A_manufacturePost , A_manufactureGet , AJ_ownerOfHashGet , AC_paymentToSupplierByManufacturer , K_manufacureBalance , B_supplierResponse , B_supplierResponseGet , BJ_ownerOfHashGet , D_creatingCar , G_getCarDetails ,BK_manufacureBalance , E_shippedCarToCustomer , EPR_shippedCarToCustomer , EJ_ownerOfHashGet , EK_manufacureBalance};