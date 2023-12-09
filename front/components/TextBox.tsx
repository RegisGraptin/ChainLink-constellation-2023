import React from 'react'


const TextBox = ({children, onClick}: any) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
    className='h-32 w-32 bg-white border-2 border-red-400 text-red-400 text-center items-center flex justify-center'
    onClick={handleClick}
    >
        {children}
    </div>
  )
}

export default TextBox