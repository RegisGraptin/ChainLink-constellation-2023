
import React, { useState } from 'react'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
// import wagmigotchiABI from "../../../contract//artifacts/contracts/ERC6551Registry.sol/ERC6551Registry.json";
import wagmigotchiABI from "../../resources/ERC6551Registry.json";
import { Button } from '../Button'
import { create } from 'domain'

export const Step4 = (props:any) => {


  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xe566b65Bc13604Eca2482D2432Ad6C75bf8eAA09",
    abi: wagmigotchiABI.abi,
    functionName: 'createAccount',
    args: [process.env.NEXT_PUBLIC_ERC6551ACOUNT_ADDRESS, 11155111, process.env.NEXT_PUBLIC_GIFT_NFT, 1, 0, "0x"],
    // onSuccess: async (data) => {

    // }
  })

  const createWRAP = async () => {
    await write()
    setTimeout(() => {
      props.nextPage(); // Call the nextPage() function after the delay
  }, 20000);
  }
 
  return (
    <div className='flex flex-col justify-center items-center space-y-16 mt-20'>
        <p className="text-red-400 font-bold text-2xl">Create WRAP and share</p>
    <Button onClick={() => createWRAP()}>Create WRAP</Button>
    </div>
  )
}
