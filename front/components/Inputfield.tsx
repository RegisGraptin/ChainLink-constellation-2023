import React from 'react'
import { useState } from 'react'

export const Inputfield = () => {
    const [value, setValue] = useState("WRAPPD.ETH")
    const handleValueChange = (e:any) => {
        setValue(e.target.value)
    }

  return (

    <div className='flex justify-center items-center'>
    <input className="text-red-400 bg-white font-semibold border-2 border-red-400 rounded-3xl w-52 h-12 flex justify-center items-center" type="text" value={value} onChange={handleValueChange}/>
    </div>
  )
}
