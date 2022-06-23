// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract OrderRegistry {
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

    string owner;

  }

  mapping(uint=>Order) registry;
  mapping(bytes32=>Order) details;
  // mapping(bytes32=>string) owner;
  bool requiredParts=false;
  bytes32 supplierCreatedHash;
  bytes32 manufacturerCreatedHash;
  bytes32 customerCreatedHash;
  string partName;
  uint quantity;
  string date;

  event OrderGenerated(string orderno);
  event MfgTrigger(string orderno);
  event SupplyTrigger(string orderno);
  event ReportSubmit(string orderno, uint category, string report);


function A_manufactureRequest(string memory _partName , uint _quantity , string memory _date)public {
  partName = _partName;
  quantity = _quantity;
  date = _date;
}


  function B_supplierResponse() public returns(bytes32){
      //saving supplier data
    string memory _partName = partName ;
   uint _quantity = quantity;
  string memory _date= date ;
      registry[0].supplierName = 'Tata';
      registry[0].supplierPartName = _partName;
      registry[0].supplierQuantity =_quantity;
      registry[0].supplierPrice = 1000;
      registry[0].supplierDate = _date;
      registry[0].owner = 'Supplier Tata';
      //creating hash
      supplierCreatedHash = keccak256(abi.encode(
                           registry[0].supplierName,
                           registry[0].supplierPartName ,
                           registry[0].supplierQuantity ,
                           registry[0].supplierPrice,
                           registry[0].supplierDate,
                           registry[0].owner
                          )
               );

     // saving data to 32bytes mapping to get all details
      details[supplierCreatedHash].supplierName = ' Tata';
      details[supplierCreatedHash].supplierPartName = _partName;
      details[supplierCreatedHash].supplierQuantity = _quantity;
      details[supplierCreatedHash].supplierPrice = 1000;
      details[supplierCreatedHash].supplierDate = _date;
      details[supplierCreatedHash].owner='Supplier Tata';
      requiredParts  = true;
      return supplierCreatedHash;
  }


  function C_transferPartsToManufacturer() public{
    require(requiredParts == true,'Supplier Must Made The Parts');
    details[supplierCreatedHash].owner='Ownership Transfer From Supplier Tata To Jaguar Manufacturer';
  }


  function D_creatingCar() public returns(bytes32){
      //saving supplier data
    require(requiredParts == true,'Without All Parts Car Cannot Made');
    require(quantity > 0,'Enter All Required Field In Manufacture');
      registry[0].manufacturerPartName = 'Car Frame ';
      registry[1].manufacturerPartName = 'Car Engine ';
      registry[2].manufacturerPartName = 'Car Handle ';
      registry[0].manufactureName = 'Jaguar';
      registry[0].manufacturePrice = 5000000;
      registry[0].manufactureDate = '27June2022';
      registry[0].manufactureQuantity = 5;
      registry[0].owner='Jaguar manufacturer';
      

      //creating hash
      manufacturerCreatedHash = keccak256(abi.encode(
                                       registry[0].manufacturerPartName ,
                                       registry[1].manufacturerPartName ,
                                       registry[2].manufacturerPartName,
                                       registry[0].manufactureName,
                                       registry[0].manufacturePrice ,
                                       registry[0].manufactureDate,
                                       registry[0].manufactureQuantity,
                                       details[supplierCreatedHash].owner
                          )
               );

     // saving data to 32bytes mapping to get all details
      details[manufacturerCreatedHash].manufacturerPartName = string.concat(registry[0].manufacturerPartName,registry[1].manufacturerPartName ,registry[2].manufacturerPartName , partName);
      details[manufacturerCreatedHash].manufactureName = 'Jaguar';
      details[manufacturerCreatedHash].manufacturePrice = 5000000;
      details[manufacturerCreatedHash].manufactureDate = '27June2022';
      details[manufacturerCreatedHash].manufactureQuantity = 5;
      details[manufacturerCreatedHash].manufactureProductName = 'Jaguar A60';
      details[manufacturerCreatedHash].owner='Jaguar Manufacturer';
      return manufacturerCreatedHash;
  
  }

  function E_transferCarToCustomer(string memory _customerName , uint _customerQuantity)public returns(bytes32){
      details[manufacturerCreatedHash].owner='Car Ownership Transafer To devid';
      details[manufacturerCreatedHash].manufactureQuantity = 5-registry[0].customerQuantity;
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
        details[customerCreatedHash].customerQuantity =quantity;       
        details[customerCreatedHash].owner=_customerName;    
        details[customerCreatedHash].customerProductName = details[manufacturerCreatedHash].manufactureProductName ;
         details[customerCreatedHash].customerPrice = details[manufacturerCreatedHash].manufacturePrice * _customerQuantity;                     
         return customerCreatedHash;
  }

  function F_getCustomerDetail(bytes32 _customerCreatedHash)view public returns(string memory customerName , uint customerQuantity , string memory owner , string memory customerProductName , uint customerPrice){
    return (
              details[_customerCreatedHash].customerName ,
              details[_customerCreatedHash].customerQuantity ,
              details[_customerCreatedHash].owner ,
               details[_customerCreatedHash].customerProductName ,
               details[_customerCreatedHash].customerPrice
             );
  }

  function G_getCarDetails(bytes32 _manufacturerCreatedHash) view public returns(string memory manufacturerPartName , string memory manufactureName ,uint manufacturePrice , string memory manufactureDate , uint manufactureQuantity , string memory Owner)
  {
      return (
              details[_manufacturerCreatedHash].manufacturerPartName ,
              details[_manufacturerCreatedHash].manufactureName ,
              details[_manufacturerCreatedHash].manufacturePrice ,
             details[_manufacturerCreatedHash].manufactureDate ,
               details[_manufacturerCreatedHash].manufactureQuantity,
               details[_manufacturerCreatedHash].owner
             );
             
  }

  function H_getingSupplierDetails(bytes32 _supplierCreatedHash)public view returns(string memory supplierName , string memory supplierPartName , uint supplierQuantity , uint supplierPrice , string memory supplierDate , string memory owner)
  {
      return (
                details[_supplierCreatedHash].supplierName,
                details[_supplierCreatedHash].supplierPartName ,
                details[_supplierCreatedHash].supplierQuantity ,
                details[_supplierCreatedHash].supplierPrice ,
                details[_supplierCreatedHash].supplierDate ,
                details[_supplierCreatedHash].owner
      );
  }
 
  // function getOwner(bytes32 _checkOwnerOfMaterial)public view returns(string memory Owner){
  //   return owner[_checkOwnerOfMaterial];
  // }

//   function createOrder(string memory orderno, string memory product, string memory temp, string memory value, string memory quantity, string memory delivery) public {
//     registry[orderno].product_name = product;
//     registry[orderno].thresh_temp = temp;
//     registry[orderno].dist_value = value;
//     registry[orderno].dist_quantity = quantity;
//     registry[orderno].dist_date = delivery;
//     emit OrderGenerated(orderno);
//   }

//   function setDistValues(string memory orderno, string memory name, string memory delivery, string memory value, string memory quantity) public {
//     registry[orderno].dist_name = name;
//     registry[orderno].mfg_date = delivery;
//     registry[orderno].mfg_value = value;
//     registry[orderno].mfg_quantity = quantity;
//     emit MfgTrigger(orderno);
//   }

//   function setMfgValues(string memory orderno, string memory name, string memory material, string memory delivery, string memory value, string memory quantity) public {
//     registry[orderno].mfg_name = name;
//     registry[orderno].supplier_date = delivery;
//     registry[orderno].supplier_value = value;
//     registry[orderno].supplier_quantity = quantity;
//     registry[orderno].raw_material_name = material;
//     emit SupplyTrigger(orderno);
//   }

//   function setReport(string memory orderno,uint category, string memory report) public {
//     if(category == 1) {
//       registry[orderno].dist_report = report;
//     }
//     if( category == 2 ) {
//       registry[orderno].mfg_report = report;
//     }
//     if( category == 3 ) {
//       registry[orderno].supplier_report = report;
//     }
//     emit ReportSubmit(orderno, category, report);
//   }

//   function getReport(string memory orderno,uint category) public view returns(string memory) {
//     if(category == 1) {
//       return registry[orderno].dist_report;
//     }
//     if( category == 2 ) {
//       return registry[orderno].mfg_report;
//     }
//     if( category == 3 ) {
//       return registry[orderno].supplier_report;
//     }
//     return "undefined";
//   }

//   function fetchInitialDetails(string memory orderno) public view returns(string memory, string memory, string memory,string memory, string memory) {
//     return (registry[orderno].product_name,
//             registry[orderno].thresh_temp,
//             registry[orderno].dist_value,
//             registry[orderno].dist_quantity,
//             registry[orderno].dist_date);
//   }

//   function getDistValues(string memory orderno) public view returns(string memory, string memory, string memory, string memory) {
//     return (registry[orderno].dist_name , registry[orderno].mfg_date,
//             registry[orderno].mfg_value, registry[orderno].mfg_quantity);
//   }

//   function getMfgDetails(string memory orderno) public view returns(string memory,string memory,string memory,string memory,string memory) {
//     return (registry[orderno].mfg_name,
//     registry[orderno].supplier_date,
//     registry[orderno].supplier_value,
//     registry[orderno].supplier_quantity,
//     registry[orderno].raw_material_name);
//   }

}