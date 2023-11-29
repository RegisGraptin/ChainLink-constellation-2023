require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {
  solidity: "0.8.20",
  networks: {
		//Add extra chains as needed 
    hardhat: {
      chainId: 11155111,
    },
    sepolia: {
      url: `${process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_URL}`,
      accounts: [`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}`]
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
    }
  }, 
  defaultNetwork: "hardhat",
};