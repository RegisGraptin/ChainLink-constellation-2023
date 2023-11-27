import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Card: NextPage = () => {

  function isValidAddress(address: string): boolean {
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
  }

  function sendSomeFund() {
    console.log("Sending some funds - TODO");
  }

  // Get the slug from the url
  const router = useRouter();
  const contractAddress: string = router.query.address as string;

  return (
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
                onClick={() => sendSomeFund()}>
                Send some money to the gift card
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
  );
};

export default Card;
