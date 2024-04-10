import React, { InputHTMLAttributes } from 'react'
import { useUniqueId } from '../hooks/useUniqueId'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({label, ...rest}: InputProps) {
  const randomId = useUniqueId()

  return (
    <div className='flex flex-col'>
      {label && <label htmlFor={randomId} className='pt-4'> {label} </label>}
      <input 
        {...rest}
        id={randomId}
        className={`${label ? 'mt-1' : 'mt-4'} p-4 rounded-lg border outline-none h-14`}
      />
    </div>
  )
}
