// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const sampleAbi = require('../artifacts/contracts/Sample.sol/Sample.json').abi;

async function main() {
  const sample = await hre.ethers.deployContract("Sample");
  await sample.waitForDeployment();

  const sampleContract = new hre.ethers.Contract(
    await sample.getAddress(),
    sampleAbi,
    new hre.ethers.AlchemyProvider
  );

  console.log('sampleContrcat', sampleContract);

  const requester = await hre.ethers.deployContract("Requester");
  const r = await requester.waitForDeployment();

  await r.call(await sampleContract.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
