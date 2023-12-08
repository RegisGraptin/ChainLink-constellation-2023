import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { useContractRead, useContractWrite, useWalletClient, usePublicClient  } from 'wagmi';
import wagmigotchiABI from '../../../contract/artifacts/contracts/ERC6551Registry.sol/ERC6551Registry.json';
import ccipABI from '../../../contract/artifacts/contracts/TokenTransferor.sol/TokenTransferor.json';
import { TokenboundClient } from '@tokenbound/sdk';
import { Client } from "@xmtp/xmtp-js";
// import { useEnsName } from 'wagmi';
import { useEnsAddress } from './useEnsName';

const { ethers } = require("ethers");

const Card: NextPage =  () =>  {

  function isValidAddress(address: string): boolean {
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
  }

  // ENS part

  const name = 'account.eth'
  const ensName = useEnsAddress({name, chainId: 11155111})

  //Smart contract functions

    const {data: blabla, write} = useContractWrite({
      address: "0x09cb994F331d251d725B748E75CF4748F2dA6E1f",
      abi: ccipABI.abi,
      functionName: 'transferTokensPayNative',
      args: ["16015286601757825753", process.env.NEXT_PUBLIC_TBD_ACCOUNT, "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4", 1000000000000000]
    })

    const { data:bla } = useContractRead({
      address: '0xe566b65Bc13604Eca2482D2432Ad6C75bf8eAA09',
      abi: wagmigotchiABI.abi,
      functionName: 'account',
      args: [process.env.NEXT_PUBLIC_ERC6551ACOUNT_ADDRESS, 11155111, process.env.NEXT_PUBLIC_GIFT_NFT, 1, 0],
    })

    console.log(bla)

    // ccip Transfer HOOK call
    const ccipTransfer = async () => {
      await write()
      await console.log("is this the only data?:" , blabla)
    }

  // Get the slug from the url
  const router = useRouter();
  const contractAddress: string = router.query.address as string;

  // XMTP part

  // const xmtpInit = async () => {

  //   const provider = await new ethers.AlchemyProvider("sepolia", process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY);

  //   const wallet = await new ethers.Wallet(
  //     process.env.NEXT_PUBLIC_PRIVATE_KEY,
  //     provider
  //   );
      
  //   console.log(wallet)
  //   const tokenboundClient = await new TokenboundClient({
  //     signer: wallet,
  //     chainId: 11155111,
  //   });
  //   // const xmtp = await Client.create(tokenboundClient.signer);
  //   // const conversation = await xmtp.conversations.newConversation("0xD8C868b4cF90b97D623Cb73DfC4d35772c9e7482");

  // }



  // Initialize client

  

// Create the client with your wallet. This will connect to the XMTP development network by default
// const xmtp = await Client.create(publicClient, { env: "dev" });
// Start a conversation with XMTP
// const conversation = await xmtp.conversations.newConversation(
//   "0x3F11b27F323b62B159D2642964fa27C46C841897",
// );
// // Load all messages in the conversation
// const messages = await conversation.messages();
// // Send a message
// await conversation.send("gm");
// // Listen for new messages in the conversation
// for await (const message of await conversation.streamMessages()) {
//   console.log(`[${message.senderAddress}]: ${message.content}`);
// }

  return (
    <div>
      <Header />

      <main>
    
      <section>
        {isValidAddress(contractAddress) && (
            <div>
              <h1 className="text-3xl font-bold underline">
                This is a valid address: {router.query.address}
              </h1>

              <section>
                <h2>Here my birthday card</h2>
                <p>Some text</p>

                <button 
                  type="button" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => ccipTransfer()}>
                  Send some money to the gift card
                </button>
                <div>Address: {ensName.data}</div>
              </section>
            </div>
          )
        }
        {!isValidAddress(contractAddress) && (
          <div>
            <h1 className="text-3xl font-bold underline">
              This is an invalid address: {router.query.address}
            </h1>
            <Link href="/card/0x0000000000000000000000000000000000000000">
              You can click here, it is a valid address: 0x0000000000000000000000000000000000000000
            </Link>
          </div>
          )
        }
      </section>
    </main>
    </div>
  );
};

export default Card;
