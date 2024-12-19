// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InternCoin is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("InternCoin", "ITC") Ownable(msg.sender) {
        // Mint the initial supply to the deployer's address (owner)
        _mint(msg.sender, initialSupply);
    }

    // Minting function (only the owner can call this)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
