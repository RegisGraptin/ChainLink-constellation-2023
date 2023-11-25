require("hardhat");

async function main() {
  const Giftnft = await ethers.deployContract("GiftNFT");
  const giftnft = await Giftnft.waitForDeployment();
 

  const Account = await ethers.deployContract("ERC6551Account");
  const account = await Account.waitForDeployment();

  const Registry = await ethers.deployContract("ERC6551Registry");
  const registry = await Registry.waitForDeployment();

  console.log("GiftNft contract deployed at:", giftnft.target);
  console.log("Account contract deployed at:", account.target);
  console.log("Registry contract deployed at:", registry.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});