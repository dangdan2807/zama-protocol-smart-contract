const hre = require("hardhat");

async function main() {
  const PrivateCounter = await hre.ethers.getContractFactory("PrivateCounter");
  const counter = await PrivateCounter.deploy();
  await counter.deployed();
  console.log(`Deployed to: ${counter.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
