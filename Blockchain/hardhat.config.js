require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    mumbai: {
      url:process.env.ALCHEMY_PRIVATE_API,
      accounts:[process.env.WALLET_ACCOUNT]
    }
  }
};
