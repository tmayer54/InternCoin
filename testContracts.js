const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/iIyBy2pe3NUMmj-u9zDD3TJyzSu9xESY");
const contractAddress = "0x259c452b3AFA33bd6E30B35c3dEcCf47f83868fb";
const contractABI = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "name": "", "type": "uint256" }],
    "type": "function"
  }
];

const testBalanceOf = async () => {
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // Replace with the wallet address you want to test
  const walletAddress = "0x2682956ca6825d7f39b4ec43b0b7ce3127de0192";
  
  try {
    const balance = await contract.balanceOf(walletAddress);
    console.log("Balance (Raw):", balance.toString());
    console.log("Balance (Formatted):", ethers.formatUnits(balance, 18));
  } catch (error) {
    console.error("Error calling balanceOf:", error);
  }
};

testBalanceOf();
