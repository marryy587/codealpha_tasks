// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoLockingPortfolio {
    mapping(address => uint) public balances;
    mapping(address => uint) public unlockTime;

    function deposit(uint _lockTimeInSeconds) public payable {
        require(msg.value > 0, "Deposit some Ether");
        require(_lockTimeInSeconds > 0, "Lock time must be greater than 0");

        balances[msg.sender] += msg.value;
        unlockTime[msg.sender] = block.timestamp + _lockTimeInSeconds;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "No balance available");
        require(block.timestamp >= unlockTime[msg.sender], "Funds are still locked");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        payable(msg.sender).transfer(amount);
    }

    function getCurrentTime() public view returns (uint) {
        return block.timestamp;
    }
}