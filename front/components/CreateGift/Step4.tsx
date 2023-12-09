import React from 'react'
import { useContractRead } from 'wagmi'
import wagmigotchiABI from "../../../contract//artifacts/contracts/ERC6551Registry.sol/ERC6551Registry.json";
import { Button } from '../Button';


export const Step4 = () => {

    const { data:accountAddress } = useContractRead({
        address: '0xe566b65Bc13604Eca2482D2432Ad6C75bf8eAA09',
        abi: wagmigotchiABI.abi,
        functionName: 'account',
        args: [process.env.NEXT_PUBLIC_ERC6551ACOUNT_ADDRESS, 11155111, process.env.NEXT_PUBLIC_GIFT_NFT, 1, 0],
      })

      console.log("acc address is:", accountAddress)

  return (
    <div className='flex flex-col justify-center items-center space-y-16 mt-20'>
        <p className="text-red-400 font-bold text-2xl">WRAPPD Address</p>
        <Button>{accountAddress}</Button>
        <p className="text-red-400 font-bold text-2xl">Delivery date</p>
        <Button>DD/MM/YYYY</Button>
    </div>
  )
}
