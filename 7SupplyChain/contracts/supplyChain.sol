// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract supplyChain{
  struct Order {
    string supplierName;
    uint supplierQuantity;
    uint supplierPrice;
    string supplierDate;
    string supplierPartName;


    string manufactureName;
    uint manufactureReuiredPartQuantity;
    uint manufactureQuantity;
    uint manufacturePrice;
    string manufactureProductName;
    string manufactureDate;
    string manufacturerPartName;


    string customerName;
    uint customerQuantity;
    string customerProductName;
    uint customerPrice;

    // string owner;
    string productName;
    string productStatus;
    string paymentStatus;

    //for manufacture request
      string  partName ;
      uint quantity ;
      string  date ;
      string nameOfYourCompany;
      uint price;


  }
  struct Owner{
    address ownerAddress;
    string ownerName;
  }

  mapping(uint=>Order) registry; //saving data like array
  mapping(bytes32=>Order) details;// saving data like unique hash form
  mapping(bytes32=>Owner) owner;

  bool requiredParts=false;
  bytes32 supplierCreatedHash;
  bytes32 manufacturerCreatedHash;
  bytes32 customerCreatedHash;
  bytes32 manufactureRequestCreatedHash;

  address manufactureAddress;
  address supplierAddress;
  address customerAddress;

  event OrderGenerated(string orderno);
  event MfgTrigger(string orderno);
  event SupplyTrigger(string orderno);
  event ReportSubmit(string orderno, uint category, string report);


function A_manufactureRequest(string memory _partName , uint _quantity , string memory _date , uint _price , string memory _nameOfYourCompany)  public returns(bytes32){
  //setting owner
  manufactureAddress =msg.sender;
  //saving data
  registry[0].partName = _partName;
  registry[0].quantity = _quantity;
  registry[0].date = _date;
  registry[0].price = _price*10**18;
  registry[0].nameOfYourCompany=_nameOfYourCompany;
   //creating hash
      manufactureRequestCreatedHash = keccak256(abi.encode(
                                                           registry[0].partName ,
                                                           registry[0].quantity ,
                                                           registry[0].date ,
                                                           registry[0].price ,
                                                           registry[0].nameOfYourCompany
                                                          )
                                               );
  // saving data on hash
  details[manufactureRequestCreatedHash].partName = _partName;
  details[manufactureRequestCreatedHash].quantity = _quantity;
  details[manufactureRequestCreatedHash].date = _date;
  details[manufactureRequestCreatedHash].price = _price*10**18;
  details[manufactureRequestCreatedHash].nameOfYourCompany=_nameOfYourCompany;
  details[manufactureRequestCreatedHash].productStatus = "Not Accepted Till Now";
  details[manufactureRequestCreatedHash].paymentStatus = "Pending";
  //saving data for hash detail function
  string memory a = string(abi.encodePacked(_nameOfYourCompany,' ','Requested For Part'));
  details[manufactureRequestCreatedHash].productName=string(abi.encodePacked(a,' ',_partName));
  owner[manufactureRequestCreatedHash].ownerAddress = msg.sender;
  owner[manufactureRequestCreatedHash].ownerName = _nameOfYourCompany;
 return manufactureRequestCreatedHash;
}


  function B_supplierResponse(bytes32 _manufactureRequestedHash) public returns(bytes32){
  //for balance
    string memory _partName = details[_manufactureRequestedHash].partName ;
   uint _quantity = details[_manufactureRequestedHash].quantity;
  string memory _date= details[_manufactureRequestedHash].date ;
  string memory _nameOfYourCompany = details[_manufactureRequestedHash].nameOfYourCompany;
  uint _price = details[_manufactureRequestedHash].price;
     //saving supplier data
      registry[0].supplierName = 'Tata';
      registry[0].supplierPartName = _partName;
      registry[0].supplierQuantity =_quantity;
      registry[0].supplierDate = _date;
      registry[0].supplierPrice = _price;
      registry[0].nameOfYourCompany = _nameOfYourCompany;
      //creating hash
      supplierCreatedHash = keccak256(abi.encode(
                           registry[0].supplierName,
                           registry[0].supplierPartName ,
                           registry[0].supplierQuantity ,
                           registry[0].supplierDate,
                           registry[0].supplierPrice,
                           registry[0].nameOfYourCompany
                          )
               );

     // saving data to 32bytes mapping to get all details
      details[supplierCreatedHash].supplierName = ' Tata';
      details[supplierCreatedHash].supplierPartName = _partName;
      details[supplierCreatedHash].supplierQuantity = _quantity;
      details[supplierCreatedHash].supplierPrice = _price;
      details[supplierCreatedHash].supplierDate = _date;
      details[supplierCreatedHash].nameOfYourCompany = _nameOfYourCompany;
      details[manufactureRequestCreatedHash].productStatus = "Accepted & Maded";
      details[supplierCreatedHash].productStatus = "Accepted & Maded";
      details[supplierCreatedHash].paymentStatus ="Pending";
      requiredParts  = true; // setting required part so manufacture cant made product without parts
      //setting part ownership to supplier
      owner[supplierCreatedHash].ownerAddress = msg.sender;
      owner[supplierCreatedHash].ownerName = 'Tata Supplier';
      details[supplierCreatedHash].productName = _partName ;
      return supplierCreatedHash;
  }

  function C_paymentToSupplierByManufacturer(address payable _supplierAddress)public payable{

    require(msg.value == details[supplierCreatedHash].supplierPrice," Odering Time Price And Current Price Not Matching");
    require(requiredParts == true,'Supplier Part Is Not Maded');
    _supplierAddress.transfer(msg.value);
    details[supplierCreatedHash].paymentStatus ="Payment Complete";
    details[supplierCreatedHash].productStatus = " Delivered To Manufacturer";
    details[manufactureRequestCreatedHash].productStatus = " Delivered To Manufacturer";
    details[manufactureRequestCreatedHash].paymentStatus ="Payment Completed";
      //transfering ownership supplier to manufacturer
    owner[supplierCreatedHash].ownerAddress = manufactureAddress ;
    owner[supplierCreatedHash].ownerName = details[manufactureRequestCreatedHash].nameOfYourCompany ;
    details[supplierCreatedHash].productName = details[supplierCreatedHash].supplierPartName ;
  }



  function D_creatingCar(address _manufactureAddress , string memory _productName , uint _productPrice , string memory _date , uint _quantity) public returns(bytes32){
    require(_manufactureAddress == manufactureAddress);
    require(msg.sender==manufactureAddress);
    require(requiredParts == true,'Without All Parts Car Cannot Made');
    require(registry[0].quantity > 0,'Enter All Required Field In Manufacture');
      //saving supplier data
      registry[0].manufacturerPartName = 'Car Frame ';
      registry[1].manufacturerPartName = 'Car Engine ';
      registry[2].manufacturerPartName = 'Car Handle ';
      registry[3].manufacturerPartName = details[supplierCreatedHash].supplierPartName;
      registry[0].manufactureName = 'Jaguar';
      registry[0].manufactureProductName = _productName;
      registry[0].manufacturePrice = _productPrice*10**18;
      registry[0].manufactureDate = _date;
      registry[0].manufactureQuantity = _quantity;

      //creating hash
      manufacturerCreatedHash = keccak256(abi.encode(
                                       registry[0].manufacturerPartName ,
                                       registry[1].manufacturerPartName ,
                                       registry[2].manufacturerPartName,
                                       registry[3].manufacturerPartName,
                                       registry[0].manufactureName,
                                       registry[0].manufactureProductName,
                                       registry[0].manufacturePrice ,
                                       registry[0].manufactureDate,
                                       registry[0].manufactureQuantity
                          )
               );

     // saving data to 32bytes mapping to get all details
      string memory a = string(abi.encodePacked(registry[0].manufacturerPartName,' ',registry[1].manufacturerPartName));
      string memory b = string(abi.encodePacked(registry[2].manufacturerPartName,' ',registry[3].manufacturerPartName));
      details[manufacturerCreatedHash].manufacturerPartName = string(abi.encodePacked(a,'',b));
      details[manufacturerCreatedHash].manufactureName = 'Jaguar';
      details[manufacturerCreatedHash].manufactureProductName = _productName;
      details[manufacturerCreatedHash].manufacturePrice =_productPrice*10**18;
      details[manufacturerCreatedHash].manufactureDate = _date;
      details[manufacturerCreatedHash].manufactureQuantity = _quantity;
      //setting carownership to manufacturer
      owner[manufacturerCreatedHash].ownerAddress = msg.sender;
      owner[manufacturerCreatedHash].ownerName = 'Jaguar Manuacturer';
       details[manufacturerCreatedHash].productName =_productName ;
       details[manufacturerCreatedHash].productStatus = "Car Maded" ;
       details[manufacturerCreatedHash].paymentStatus = "Not Yet Customer Order" ;
      return manufacturerCreatedHash;
  
  }

  function E_shippedCarToCustomer(string memory _customerName , uint _customerQuantity , address payable _payingToManufacturer )public payable returns(bytes32){
    // payment
       require(msg.value == _customerQuantity*details[manufacturerCreatedHash].manufacturePrice," Manufacture And Customer Price Not Matching Depending Upon Quantity");
    _payingToManufacturer.transfer(msg.value);
    details[manufacturerCreatedHash].paymentStatus ="Payment Complete";
    details[manufacturerCreatedHash].productStatus = " Delivered To Customer";

      details[manufacturerCreatedHash].manufactureQuantity = details[manufacturerCreatedHash].manufactureQuantity-_customerQuantity;
      //saving supplier data
    registry[0].customerName = _customerName;
    registry[0].customerQuantity =_customerQuantity;
    //creating hash
      customerCreatedHash = keccak256(abi.encode(
                                                     registry[0].customerName,
                                                     registry[0].customerQuantity
                                                    )
                                         );
      // saving data to 32bytes mapping to get all details
        details[customerCreatedHash].customerName = _customerName;
        details[customerCreatedHash].customerQuantity =_customerQuantity;         
        details[customerCreatedHash].customerProductName = details[manufacturerCreatedHash].manufactureProductName ;
         details[customerCreatedHash].customerPrice = details[manufacturerCreatedHash].manufacturePrice * _customerQuantity;                     
      //transfering hash ownership manufacture to customer
      owner[manufacturerCreatedHash].ownerAddress = msg.sender;
      owner[manufacturerCreatedHash].ownerName = _customerName;
      details[manufacturerCreatedHash].productName =details[manufacturerCreatedHash].manufactureProductName ;

         return customerCreatedHash;
  }

  function F_getCustomerDetail(bytes32 _customerCreatedHash)view public returns(string memory customerName , uint customerQuantity , string memory customerProductName , uint customerPrice){
    return (
              details[_customerCreatedHash].customerName ,
              details[_customerCreatedHash].customerQuantity ,
               details[_customerCreatedHash].customerProductName ,
               details[_customerCreatedHash].customerPrice
             );
  }

  function G_getCarDetails(bytes32 _manufacturerCreatedHash) view public returns(string memory manufacturerPartName , string memory manufactureName ,uint manufacturePrice , string memory manufactureDate , uint manufactureQuantity )
  {
      return (
              details[_manufacturerCreatedHash].manufacturerPartName ,
              details[_manufacturerCreatedHash].manufactureName ,
              details[_manufacturerCreatedHash].manufacturePrice ,
             details[_manufacturerCreatedHash].manufactureDate ,
               details[_manufacturerCreatedHash].manufactureQuantity
             );
             
  }

  function H_getingSupplierDetails(bytes32 _supplierCreatedHash)public view returns(string memory supplierName , string memory supplierPartName , uint supplierQuantity , uint supplierPrice , string memory supplierDate )
  {
      return (
                details[_supplierCreatedHash].supplierName,
                details[_supplierCreatedHash].supplierPartName ,
                details[_supplierCreatedHash].supplierQuantity ,
                details[_supplierCreatedHash].supplierPrice ,
                details[_supplierCreatedHash].supplierDate 
      );
  }

  function I_getManufactureRequest(bytes32 _manufactureRequestCreatedHash)view public returns(string memory _partName , uint _quantity , string memory _date , string memory _nameOfCompany){
    return(
           details[_manufactureRequestCreatedHash].partName,
           details[_manufactureRequestCreatedHash].quantity,
           details[_manufactureRequestCreatedHash].date,
           details[_manufactureRequestCreatedHash].nameOfYourCompany
          );
  }

  function J_ownerOfHash(bytes32 _hash) view public returns(address _ownerAddress , string memory _ownerName , string memory _productName ,string memory _productStatus , string memory _paymentStatus ){
    return(
            owner[_hash].ownerAddress,
            owner[_hash].ownerName,
            details[_hash].productName,
            details[_hash].productStatus,
            details[_hash].paymentStatus
          );
  }

}