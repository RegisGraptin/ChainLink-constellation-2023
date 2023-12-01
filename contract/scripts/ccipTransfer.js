require("hardhat");
require("dotenv").config();


async function main() {
  const TokenTransferor = await ethers.getContractFactory("TokenTransferor");
  const tokentransferor = await TokenTransferor.attach(process.env.NEXT_PUBLIC_CCIP_CONTRACT_ADDRESS_AVALANCHE);

  // function arguments for sending ( this is for avalanche )
  const destinationChain = 16015286601757825753; // Sepolia
  const receiver = process.env.NEXT_PUBLIC_TBD_ACCOUNT;
  const tokenAddress = "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4"; // CCIP - BnM
  const amount = 1000000000000000;

  const tx = await tokentransferor.transferTokensPayNative(destinationChain, receiver, tokenAddress, amount);
  const receipt = await tx.wait();
//   const address = await registry.account(implementation, chainID, tokenAddress, tokenId, salt)
  
  if(receipt.status){
   console.log(`CCIP transaction succesffull, ${amount} CCIP-BnM has been sent to ${receiver}`);
  }
   else{
    console.log("CCIP transaction failed");
  }

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});