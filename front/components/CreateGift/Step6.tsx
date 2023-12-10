import React from 'react'
import { Button } from '../Button'
import { useContractWrite, useContractRead } from 'wagmi'
// import ccipABI from '../../../contract/artifacts/contracts/TokenTransferor.sol/TokenTransferor.json'
import ccipABI from "../../resources/TokenTransferor.json";
import wagmigotchiABI from "../../resources/ERC6551Registry.json"

export const Step6 = (props:any) => {

  const { data: accountAddress }:any = useContractRead({
    address: '0xe566b65Bc13604Eca2482D2432Ad6C75bf8eAA09',
    abi: wagmigotchiABI.abi,
    functionName: 'account',
    args: [process.env.NEXT_PUBLIC_ERC6551ACOUNT_ADDRESS, 11155111, process.env.NEXT_PUBLIC_GIFT_NFT, 1, 0],
  })

  const {data: blabla, write} = useContractWrite({
    address: "0x09cb994F331d251d725B748E75CF4748F2dA6E1f",
    abi: ccipABI.abi,
    functionName: 'transferTokensPayNative',
    args: ["16015286601757825753", process.env.NEXT_PUBLIC_TBD_ACCOUNT, "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4", 1000000000000000]
  })

  const ccipCall = async () => {
    await write()
  }

  return (
    <div className='flex flex-col justify-center items-center space-y-4 mt-20'>
     <p className="text-red-400 font-bold text-2xl">DONE </p>
    <p className="text-red-400 font-bold text-2xl"> Your new WRAP address is</p>
    <p className="text-red-400 font-bold text-2xl underline">{accountAddress}</p>
    <p className="text-red-400 font-bold text-2xl"> Add funds to any chain on this WRAP</p>
    <p className="text-red-400 font-bold text-2xl"> It will be delivered to the recipient automatically</p>
    <Button onClick={() => ccipCall()}>Send fund to the Wrapp</Button>
</div>
  )
}
