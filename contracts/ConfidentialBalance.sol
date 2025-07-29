// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@fhenixprotocol/contracts/FHE.sol";

contract PrivateCounter {
    // Số bí mật đã mã hóa
    euint32 private encryptedCounter;

    constructor() {
        encryptedCounter = FHE.asEuint32(0);
    }

    // Nhận số đã mã hóa từ phía client
    function setEncryptedCounter(euint32 _encryptedValue) public {
        encryptedCounter = _encryptedValue;
    }

    // Cộng thêm giá trị plaintext sau khi mã hóa nó trên chain
    function addToCounter(uint32 _value) public {
        encryptedCounter = encryptedCounter + FHE.asEuint32(_value);
    }

    // Trả về số đã mã hóa
    function getEncryptedCounter() public view returns (euint32) {
        return encryptedCounter;
    }
}
