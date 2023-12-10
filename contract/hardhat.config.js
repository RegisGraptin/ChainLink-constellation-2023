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
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY]
    },
    mumbai: {
      url: `${process.env.MUMBAI_ALCHEMY_API}`,
      accounts: ["0x" + process.env.PRIVATE_KEY],
    },
  }, 
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: {
      sepolia: "HJFG7Y2C72ZZGX68T2G3XV74V669WYQI88",
    },
  },
  sourcify: {
    enabled: true
  }
};