const { ethers } = require("hardhat");

async function main() {
  // Get the deployer's wallet address
  const [deployer] = await ethers.getSigners();
  const initialSupply = hre.ethers.parseUnits("1000", 18); // 1,000 tokens
  console.log("Deploying contract with account:", deployer.address);

  // Fetch and log the deployer's balance in Ether
  const deployerBalance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(deployerBalance), "ETH");

  // Get the contract factory
  const InternCoin = await ethers.getContractFactory("InternCoin");

  // Deploy the contract
  console.log("Deploying InternCoin...");
  const internCoin = await InternCoin.deploy(initialSupply); // Initial supply of 1,000 ITC

  // Log the transaction hash
  console.log("Transaction hash:", internCoin.deploymentTransaction()?.hash);

  // Log the deployed address
  console.log("InternCoin deployed to:", await internCoin.getAddress());
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
