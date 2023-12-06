// import { ethers as eth } from "ethers";


const fs = require("fs");
const path = require("path");

const { Location } = require("@chainlink/functions-toolkit");
const { SecretsManager } = require("@chainlink/functions-toolkit");
const { SubscriptionManager } = require("@chainlink/functions-toolkit");

const { ethers } = require("hardhat");

const { utils } = require("ethers");
const { networks } = require("../networks.js");

const NETWORK = "polygonMumbai";

const FUNCTIONS_ROUTER_ADDRESS = networks[NETWORK].functionsRouter;
const DON_ID = networks[NETWORK].donId;
const LINK_TOKEN_ADDRESS = networks[NETWORK].linkToken;
const GATEWAY_URLS = networks[NETWORK].gatewayUrls;

const SUBSCRIPTION_ID = "718";

const GPT_API_KEY = process.env.GPT_API_TOKEN;


const LINK_AMOUNT = "3.3"

async function deploySmartContract() {
    const donIdBytes32 = ethers.encodeBytes32String(DON_ID);

    const Giftnft = await ethers.deployContract("GiftNFT", [FUNCTIONS_ROUTER_ADDRESS, donIdBytes32]);
    const giftnft = await Giftnft.waitForDeployment();

    console.log("GiftNft contract deployed at:", giftnft.target);
    return giftnft;
}

// giftnft: eth.Contract
async function fundSmartContract (giftnft) {
    
    const consumerAddress = giftnft.target;

    const [signer] = await ethers.getSigners();

    const subscriptionManager = new SubscriptionManager({
      signer,
      LINK_TOKEN_ADDRESS,
      FUNCTIONS_ROUTER_ADDRESS,
    });
  
    await subscriptionManager.initialize();
  
    // Create Subscription
    const subscriptionId = await subscriptionManager.createSubscription();
    console.log(`\n Subscription ${subscriptionId} created.`);
  
    // add consumer to subscription
    const receipt = await subscriptionManager.addConsumer({
      subscriptionId,
      consumerAddress
    });
  
    console.log(
      `\n Subscription ${subscriptionId} now has ${consumerAddress} as a consumer.)`
    );
  
      // Fund Subscription
      const juelsAmount = utils.parseUnits(LINK_AMOUNT, 18).toString()
      subscriptionManager.fundSubscription({
          subscriptionId,
          juelsAmount
      })
  
      console.log(`\n Subscription ${subscriptionId} funded with ${LINK_AMOUNT} LINK.`)
  };

// apiKey: string
async function setSecretVariable(apiKey) {
  
  const [signer] = await ethers.getSigners();

  const secretsManager = new SecretsManager({
    signer,
    FUNCTIONS_ROUTER_ADDRESS,
    DON_ID,
  });

  await secretsManager.initialize();

  if (!apiKey && apiKey.length == 0) {
    throw Error("Please verify the secret key. Seems it is not defined.");
  }

  const secrets = {
      apiKey: apiKey
  };

  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);

  
  const slotId = 0;
  const minutesUntilExpiration = 75;

  const {
    version, // Secrets version number (corresponds to timestamp when encrypted secrets were uploaded to DON)
    success, // Boolean value indicating if encrypted secrets were successfully uploaded to all nodes connected to the gateway
  } = await secretsManager.uploadEncryptedSecretsToDON({
    encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
    GATEWAY_URLS,
    slotId,
    minutesUntilExpiration,
  });

  if (success) {
    console.log("Successfully uploaded the secret.")
    const encryptedSecretsReference =  secretsManager.buildDONHostedEncryptedSecretsReference({
        slotId,
        version
    })

    return encryptedSecretsReference;
  } else {
    console.log("Issue when uploading the secret.")
  }

}
// giftContract: Giftnft
async function createRequest(giftContract, encryptedSecretsReference) {
  // https://platform.openai.com/docs/guides/images/usage?context=node
  
  const source = fs
    .readFileSync(path.resolve(__dirname, "../source.js"))
    .toString();
  
  const prompt = "Generate a birthday card.";
  const args = [prompt];
  const callbackGasLimit = 300_000;

  console.log("\n Sending the Request....")
  const requestTx = await giftContract.sendRequest(
    source,
    Location.DONHosted,
    encryptedSecretsReference,
    args,
    [], // bytesArgs can be empty
    SUBSCRIPTION_ID,
    callbackGasLimit
  );

  const txReceipt = await requestTx.wait(1);
  const requestId = txReceipt.events[2].args.id;
  console.log(
    `\nRequest made.  Request Id is ${requestId}. TxHash is ${requestTx.hash}`
  );
}


deploySmartContract().then(
    async (giftnft) => {
      await fundSmartContract(giftnft);
      let encryptedSecrets = await setSecretVariable(GPT_API_KEY);
      await createRequest(giftnft, encryptedSecrets);
    }
)