pragma solidity ^0.5.8;

contract Token {

    int public tokenLimit = 100*1000000000000000000;

    mapping(address => uint) public balances;

    constructor() public {
        tokenLimit-= 10*1000000000000000000;
        balances[msg.sender] = 10*1000000000000000000;
    }
    
    function sendTokens(uint ammount, address _address) public {
        require(balances[msg.sender]>=ammount);
        balances[msg.sender]-=ammount;
        balances[_address]+=ammount;
    }
    function buyTokens() public payable {
        tokenLimit-=int(msg.value);
        require(tokenLimit>=0);
        require(msg.value>0);
        balances[msg.sender]+=msg.value;
    }

}
