import React from 'react'
import { useState } from 'react'


const TextBox = () => {
    const[value, setValue] = useState("")
    const handleChange = (e:any) => setValue(e.target.value)

  return (
    <div className='h-32 w-32 bg-white border-2 border-red-400 text-red-400 text-center items-center flex justify-center'>
        <input type='text' value={value} onChange={handleChange}/>
        <p>{value}</p>
    </div>
  )
}

export default TextBox