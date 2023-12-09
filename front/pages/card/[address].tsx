import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { useContractRead, useContractWrite } from 'wagmi';
// import wagmigotchiABI from '../../../contract/artifacts/contracts/ERC6551Registry.sol/ERC6551Registry.json';
import wagmigotchiABI from "../../resources/ERC6551Registry.json";

// import ccipABI from '../../../contract/artifacts/contracts/TokenTransferor.sol/TokenTransferor.json';
import ccipABI from "../../resources/TokenTransferor.json";

// import giftNFTAPI from "../../../contract/artifacts/contracts/GiftNFT.sol/GiftNFT.json";
import giftNFTAPI from "../../resources/GiftNFT.json";


import { TokenboundClient } from '@tokenbound/sdk';
const { Location } = require("@chainlink/functions-toolkit");

import link_token_abi from "../../resources/link_token_abi.json";
import { useEthersSigner, walletClientToSigner } from '../../components/Signer';

const { Networks } = require("../../components/Networks");
// import { useEnsName } from 'wagmi';
import { useEnsAddress } from './useEnsAddress';
import TextBox from '../../components/TextBox'
import { Contract, ethers } from 'ethers';
import { SecretsManager } from '@chainlink/functions-toolkit';

const { SubscriptionManager } = require("@chainlink/functions-toolkit");

// Source API request to call chat GPT
const source = `const gptPrompt = args[0];

const postData = {
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: gptPrompt }],
  temperature: 0,
};

const openAIResponse = await Functions.makeHttpRequest({
  url: "https://api.openai.com/v1/chat/completions",
  method: "POST",
  headers: {
    Authorization: \`Bearer \${secrets.apiKey}\`,
    "Content-Type": "application/json",
  },
  data: postData,
});

if (openAIResponse.error) {
  throw new Error(JSON.stringify(openAIResponse));
}

const result = openAIResponse.data.choices[0].message.content;

console.log(result);
return Functions.encodeString(result);
`;



// Example conrtact address
// const CONTRACT_ADDRESS = "0xeE28c200b5001f99718074AFC98A2549b84a4203"

// http://localhost:3000/card/0xeE28c200b5001f99718074AFC98A2549b84a4203

const Card: NextPage = () => {

  const NETWORK = "polygonMumbai";

  const LINK_TOKEN_ADDRESS = Networks[NETWORK].linkToken;
  const FUNCTIONS_ROUTER_ADDRESS = Networks[NETWORK].functionsRouter;
  const CHAINLINK_DON_ID = Networks[NETWORK].donId;
  const DEFAULT_LINK_AMOUNT_TOKEN = 3;


  // Get the signer from the session
  const signer: ethers.Signer | undefined = useEthersSigner();

  // TODO :: Need to be created before hand
  const encryptedSecretsRef = "0xa266736c6f744964006776657273696f6e1a6574f100";

  // TODO :: should be created before hand
  const subscriptionId = 814;

  const prompt = "Describe what a blockchain is in 15 words or less";
  const callbackGasLimit = 300_000;
  
  const { write: generateGPTImage, isLoading, isSuccess } = useContractWrite({
    address: "0xeE28c200b5001f99718074AFC98A2549b84a4203",
    abi: giftNFTAPI.abi,
    functionName: 'sendRequest',
    args: [
      source.toString(),
      Location.DONHosted,
      encryptedSecretsRef,
      [prompt],
      [], // bytesArgs can be empty
      subscriptionId,
      callbackGasLimit
    ]
  })

  const { data: lastResponse } = useContractRead({
    address: "0xeE28c200b5001f99718074AFC98A2549b84a4203",
    abi: giftNFTAPI.abi,
    functionName: 's_lastResponse',
    onSuccess: (data) => {
      
    }
  })

  const { data: lastError } = useContractRead({
    address: "0xeE28c200b5001f99718074AFC98A2549b84a4203",
    abi: giftNFTAPI.abi,
    functionName: 's_lastError',
  })

  // console.log("Last response:", ethers.decodeBytes32String(lastResponse));
  console.log("Last response:", lastResponse);
  console.log("Last error:", lastError);

  

  // Generate an image with ChatGPT using Chainlink function
  async function createSubscriptionChainLinkFunction() {

    if (signer == null) { console.log("Please connect your wallet"); }

    if (!isSuccess) {
      await generateGPTImage();
    } else {
      // Read the content
      console.log(lastResponse);
    }

    

    // // Invalid signer -> different library between hardhat and here 
    // const subscriptionManager = new SubscriptionManager({
    //   signer,
    //   LINK_TOKEN_ADDRESS,
    //   FUNCTIONS_ROUTER_ADDRESS,
    // });

    // await subscriptionManager.initialize();

    // const secretsManager = new SecretsManager({
    //   signer,
    //   FUNCTIONS_ROUTER_ADDRESS,
    //   CHAINLINK_DON_ID,
    // });

  }

  // Get the slug from the url
  const router = useRouter();
  const contractAddress: string = router.query.address as string;

  // Check if we have a valid smart contract address
  function isValidAddress(address: string): boolean {
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
  }

  // ENS part

  const name = 'account.eth'
  const ensName = useEnsAddress({ name, chainId: 11155111 })

  //Smart contract functions

  const { data: blabla, write } = useContractWrite({
    address: "0x09cb994F331d251d725B748E75CF4748F2dA6E1f",
    abi: ccipABI.abi,
    functionName: 'transferTokensPayNative',
    args: ["16015286601757825753", process.env.NEXT_PUBLIC_TBD_ACCOUNT, "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4", 1000000000000000]
  })

  const { data: bla } = useContractRead({
    address: '0xe566b65Bc13604Eca2482D2432Ad6C75bf8eAA09',
    abi: wagmigotchiABI.abi,
    functionName: 'account',
    args: [process.env.NEXT_PUBLIC_ERC6551ACOUNT_ADDRESS, 11155111, process.env.NEXT_PUBLIC_GIFT_NFT, 1, 0],
  })

  console.log(bla)

  // ccip Transfer HOOK call
  const ccipTransfer = async () => {
    await write()
    await console.log("is this the only data?:", blabla)
  }

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

                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => createSubscriptionChainLinkFunction()}>
                  Generate an image using chainlink function & chat gpt
                </button>
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
