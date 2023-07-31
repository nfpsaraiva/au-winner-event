// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Requester {

    function call(address sample) external {
        console.log("address", sample, msg.sender);
        (bool s, ) = sample.call(
            abi.encodeWithSignature("attempt()")
        );
        require(s, 'didnt work');
    }
}