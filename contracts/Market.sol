// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Market {
    IERC20 public xToken;
    IERC20 public yToken;

    constructor(IERC20 _xToken, IERC20 _yToken) {
        xToken = _xToken;
        yToken = _yToken;
    }

    function supply(uint xAmount, uint yAmount) public {
        xToken.transferFrom(msg.sender, address(this), xAmount);
        yToken.transferFrom(msg.sender, address(this), yAmount);
    }
}