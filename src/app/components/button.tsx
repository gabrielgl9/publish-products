import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export default function Button({text, ...rest}: ButtonProps) {
  return (
    <button 
      {...rest}
      className="bg-black text-white p-4 mt-4 rounded-lg border outline-none w-full"> 
        {text}
    </button>
  )
}
