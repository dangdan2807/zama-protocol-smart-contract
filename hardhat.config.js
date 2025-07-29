require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    devnet: {
      url: "https://api.devnet.fhenix.zone", // RPC của Zama Devnet
      chainId: 901,
      accounts: [process.env.PRIVATE_KEY] // Thêm private key ví testnet
    }
  }
};
