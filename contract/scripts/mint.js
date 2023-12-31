require("hardhat");
require("dotenv").config();

async function main() {
  // Get the contract instance
  const GiftNft = await ethers.getContractFactory("GiftNFT");
  const giftnft = await GiftNft.attach(process.env.NEXT_PUBLIC_GIFT_NFT);
  tokenId = await giftnft.nextId()
  //Default IPFS hash for Pinnie json metadata. Replace with your own if desired. 
  const baseURI = "ipfs://bafybeiaide7p4buvasnsx6vkewcsvopfnxeh35l2vf5xblpiwsi6enrlgy"

  //Address you want to mint your NFT to
  const to = process.env.NEXT_PUBLIC_WALLET_ADDRESS
  // Mint token
  const tx = await giftnft.mint(to, baseURI);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();

  // Log the transaction details
  console.log("Transaction hash:", receipt.hash);
  console.log("Gas used:", receipt.cumulativeGasUsed);

  // Check if the transaction was successful (status 1)
  if (receipt.status === 1) {
    console.log(`Transaction was successful. Token ${tokenId} minted to ${to}`);
  } else {
    console.log("Transaction failed.");
  }

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});