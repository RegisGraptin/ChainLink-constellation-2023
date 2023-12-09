import React from 'react'
import { useState } from 'react'

export const Button = ({initialValue, children, onClick}: any) => {
    const [value, setValue] = useState(initialValue)
    const handleValueChange = (e:any) =>{
        setValue(e.target.value)
    }

    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

  return (
    <div className='flex flex-col'>
        <button onClick={handleClick} className="text-red-400 hover:text-white bg-white hover:bg-red-400 font-bold border-2 border-red-400 rounded-3xl w-52 h-12 transition-all duration-200">{children}</button>
    </div>
  )
}
