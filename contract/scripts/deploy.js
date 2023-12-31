const { ethers } = require('hardhat');
require("hardhat");

const { networks } = require("../networks.js");

const NETWORK = "ethereumSepolia";

const routerAddress = networks[NETWORK].functionsRouter;
const donIdBytes32 = ethers.encodeBytes32String(networks[NETWORK].donId);
const giftReceiver = "0x40aD3Ad4cCDE3F803F3A667374cf2Ac1aa3b514a";

async function main() {
  const Giftnft = await ethers.deployContract("GiftNFT", [routerAddress, donIdBytes32, "ipfs://bafybeiaide7p4buvasnsx6vkewcsvopfnxeh35l2vf5xblpiwsi6enrlgy", 600, giftReceiver]);
  const giftnft = await Giftnft.waitForDeployment();

  // const Account = await ethers.deployContract("ERC6551Account");
  // const account = await Account.waitForDeployment();

  // const Registry = await ethers.deployContract("ERC6551Registry");
  // const registry = await Registry.waitForDeployment();

  // // This does not work for constructor arguments in Fuji, needs to be checked => update: This is the correct form
  // const Transferor = await ethers.deployContract("TokenTransferor", ["0x554472a2720e5e7d5d3c817529aba05eed5f82d8", "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846"]);
  // const transferor = await Transferor.waitForDeployment();

  console.log("GiftNft contract deployed at:", giftnft.target);
  console.log(routerAddress, donIdBytes32, )
  // console.log("Account contract deployed at:", account.target);
  // console.log("Registry contract deployed at:", registry.target);
  // console.log("Transferor CCIP contract address deployed at:", transferor.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});