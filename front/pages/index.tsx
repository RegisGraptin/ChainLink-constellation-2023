import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Header } from '../components/Header';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
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
    <main>
      <Header />

      <button onClick={() => write()} className='mt-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Create Gift Card</button>

    </main>
  );
};

export default Home;
