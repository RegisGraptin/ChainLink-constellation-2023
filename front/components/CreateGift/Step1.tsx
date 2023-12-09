import TextBox from '../TextBox'
import React from 'react'


export const Step1 = (props:any) => {

    return (
        <>
        <div className='flex justify-center items-center flex-col p-5 space-y-14'>
        <p className="text-red-400 text-center items-center flex justify-center font-bold">Simplify web3 gifting with WRAPPD</p>
        <button onClick={() => props.nextPage()} className="text-red-400 hover:text-white bg-white hover:bg-red-400 font-bold border-2 border-red-400 rounded-3xl w-64 h-12 transition-all duration-200"> START WRAP </button>
        <p className="text-red-400 font-bold ">How it works:</p>
        <div className="flex flex-row gap-3">
        <TextBox>Create a Wrap</TextBox>
        <TextBox>Users add fund on any chain</TextBox>
        <TextBox>Wrap delivers itself</TextBox>
        </div>
        </div>
        </>
    )
}