// SPDX-License-Identifier: MI
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token {
    IERC20 public xToken;
    IERC20 public yToken;

    constructor(IERC20 _xToken, IERC20 _yToken) {
    }
}