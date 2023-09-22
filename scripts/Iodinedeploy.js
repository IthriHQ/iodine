const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying IodineToken with the account:", deployer.address);

  const IodineToken = await ethers.getContractFactory("IodineToken");
  const iodineToken = await IodineToken.deploy();

  console.log("IodineToken address:", iodineToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
