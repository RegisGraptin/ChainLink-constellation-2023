require("hardhat");

async function main() {
  const Giftnft = await ethers.deployContract("GiftNFT");
  const giftnft = await Giftnft.waitForDeployment();
 

  const Account = await ethers.deployContract("ERC6551Account");
  const account = await Account.waitForDeployment();

  const Registry = await ethers.deployContract("ERC6551Registry");
  const registry = await Registry.waitForDeployment();

  // This does not work for constructor arguments in Fuji, needs to be checked
  // const Transferor = await ethers.deployContract("TokenTransferor", 0x554472a2720e5e7d5d3c817529aba05eed5f82d8, 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846);
  // const transferor = await Transferor.waitForDeployment();

  console.log("GiftNft contract deployed at:", giftnft.target);
  console.log("Account contract deployed at:", account.target);
  console.log("Registry contract deployed at:", registry.target);
  // console.log("Transferor CCIP contract address deployed at:", transferor.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});