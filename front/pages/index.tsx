import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Header } from '../components/Header';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import wagmigotchiABI from '../../artifacts/contracts/ERC6551Registry.sol/ERC6551Registry.json'
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
    address: '0x3d34364882b03E24ab0318aa22b5D40aa89E10e4',
    abi: [    {
      "inputs": [
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "tokenContract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "salt",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "initData",
          "type": "bytes"
        }
      ],
      "name": "createAccount",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }],
    functionName: 'createAccount',
    args: ["0x3d34364882b03E24ab0318aa22b5D40aa89E10e4", 5, "0xc813f2BE1Ced8B66c2e635954155354a8d2155Ae", 1, 0, "0x"]
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>

        <Header />

        <ConnectButton />
        <button onClick={() => write()} className='mt-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Create Gift Card</button>

      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
