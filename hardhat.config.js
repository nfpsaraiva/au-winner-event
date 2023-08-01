require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: process.env.REACT_APP_NETWORK_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    }
  }
};
