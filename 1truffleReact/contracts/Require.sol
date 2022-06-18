// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Require{
    address public owner =msg.sender;
    uint public age =25;

    function checkRequire(uint _x) public{
        age=age+5;
        require (_x>2,"Less Than 2 Ehter");
    }
}