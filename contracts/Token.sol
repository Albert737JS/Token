// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20("Token", "T"), Ownable {

    mapping(address => bool) whiteListedAddresses;

    modifier isWhitelisted(address _address) {
        require(whiteListedAddresses[_address], "You need to be whitelisted");
        _;
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    function burn(address _from, uint256 _amount) public onlyOwner {
        _burn(_from, _amount);
    }

    function buy() payable public isWhitelisted(msg.sender)  {
        _mint(msg.sender, msg.value);
    }

    function sell(address from, uint256 amount) public isWhitelisted(from) {
        require(balanceOf(msg.sender) >= amount, "Token: not enough funds");
        _burn(from, amount);
    }

    function addUserToWhiteList(address _addressToWhitelist) public onlyOwner {
        whiteListedAddresses[_addressToWhitelist] = true;
    }

    function removeUserFromWhiteList(address _addressToWhiteList) public onlyOwner {
        whiteListedAddresses[_addressToWhiteList] = false;
    }
}
