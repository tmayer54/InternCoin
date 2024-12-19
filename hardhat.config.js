require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20", // Update to match OpenZeppelin's version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Optimize for gas efficiency
      },
    },
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 10000000000, // Set gas price to 20 Gwei
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.API_KEY,
    },
  },
  sourcify: {
    enabled: true,
  },
};
