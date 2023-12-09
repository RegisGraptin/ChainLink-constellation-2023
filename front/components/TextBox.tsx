import React from 'react'
import { useState } from 'react'


const TextBox = ({children}: any) => {

    const handleTextBoxClick = () => {
        // Add functionality here for the button click
        console.log('Button clicked!');
      };

  return (
    <div onClick={handleTextBoxClick} className='h-32 w-32 bg-white border-2 border-red-400 text-red-400 text-center items-center flex justify-center'>
        {children}
    </div>
  )
}

export default TextBox