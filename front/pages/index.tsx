import type { NextPage } from 'next';
import { Header } from '../components/Header';
import { useContractWrite } from 'wagmi'
import wagmigotchiABI from '../../contract/artifacts/contracts/ERC6551Registry.sol/ERC6551Registry.json'
import {useState, useEffect} from 'react'
import { useAccount } from 'wagmi';

const Home: NextPage = () => {

  const { address } = useAccount()
  const [wallet, setWallet] = useState("")

  useEffect(() => {
		if(address){
			setWallet(address)
			console.log("wallet address is:", wallet);
		}
	}, [address]);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x3d34364882b03E24ab0318aa22b5D40aa89E10e4",
    abi: wagmigotchiABI.abi,
    functionName: 'createAccount',
    args: [process.env.NEXT_PUBLIC_ERC6551ACOUNT_ADDRESS, 5, process.env.NEXT_PUBLIC_GIFT_NFT, 1, 0, "0x"]
  })

  return (
    <div>
      <Header />

      <main>
        <section className="container mx-auto flex items-center justify-center min-h-screen">

          <div className="w-2/3 p-8">
            <h1 className="text-4xl font-bold mb-4">Wrapped Gift</h1>
            <p className="text-lg text-gray-700">
              Create a gift for your loved one.<br /> 
              Mint a NFT now to pool the fund.<br /> 
              Then, send it to your loved one on his birthday.
            </p>
            <button onClick={() => write()} className='mt-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Create Gift Card</button>
          </div>


          

          <div className="w-1/3">
            <img className="w-full h-auto max-w-lg rounded-2xl" src="/home.jpg" alt="gift image" />
          </div>

        </section>
      </main>
    </div>
  );
};

export default Home;
