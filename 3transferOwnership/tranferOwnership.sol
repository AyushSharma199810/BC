// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract transferOwnership{
    address public a =msg.sender;
    address public b =0x0DC2F7cB378Fa14107d9871B573D31227AED186f;
    
    function transfer() public{
        a=b;
    }

    function viewOwnership() public view returns(address){
        return a;
    }
}