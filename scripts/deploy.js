// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // Get configs
  const networkUrl = process.env.REACT_APP_NETWORK_URL;
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const targetContractAddress = '0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502';

  // Inits provider & wallet
  const provider = new hre.ethers.JsonRpcProvider(networkUrl);
  const wallet = new hre.ethers.Wallet(privateKey, provider);

  // Deploy Requester Contract
  const requesterArtifacts = await hre.artifacts.readArtifact('Requester');
  const requesterFactory = new hre.ethers.ContractFactory(requesterArtifacts.abi, requesterArtifacts.bytecode, wallet);
  const requesterContract = await requesterFactory.deploy();
  const requestContractAddress = await requesterContract.getAddress();

  console.log('requesterContractAddress', requestContractAddress);
  
  // call target contract contract from another contract (Requester)
  await requesterContract.call(targetContractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
