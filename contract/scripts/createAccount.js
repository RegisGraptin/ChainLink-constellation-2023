require("hardhat");
require("dotenv").config();


async function main() {
  const Registry = await ethers.getContractFactory("ERC6551Registry");
  const registry = await Registry.attach(process.env.NEXT_PUBLIC_ERC6551REGISTRY_ADDRESS);
  //update salt for a more secure hash
  const salt = 0;  
  const implementation = process.env.NEXT_PUBLIC_ERC6551ACOUNT_ADDRESS
  const tokenAddress = process.env.NEXT_PUBLIC_GIFT_NFT;
  //replace with tokenId minted in scripts/mint.js, logged on the CLI
  const tokenId = 1
  const chainID = 111551112 //sepolia
  const initData = "0x";

  const tx = await registry.createAccount(implementation, chainID, tokenAddress, tokenId, salt, initData);
  const receipt = await tx.wait();
  const address = await registry.account(implementation, chainID, tokenAddress, tokenId, salt)
  
  if(receipt.status == 1 && address){
   console.log("Account created successfully at address: ", address);
  }
   else{
    console.log("Account creation failed");
  }

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});