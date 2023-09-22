// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const CombinedTribunalNFT = await ethers.getContractFactory("CombinedTribunalNFT");
  const combinedTribunalNFT = await CombinedTribunalNFT.deploy();

  await combinedTribunalNFT.deployed();

  console.log(`CombinedTribunalNFT contract address: ${combinedTribunalNFT.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
