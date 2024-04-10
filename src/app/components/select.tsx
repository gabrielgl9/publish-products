import React, { HTMLAttributes } from 'react'
import { useUniqueId } from '../hooks/useUniqueId'

interface Option {
  value: string | number
  text: string
}

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  options: Option[]
  value: string | number
}

export default function Select({options, value, ...rest}: SelectProps) {
  const randomId = useUniqueId()
  
  return (
    <select 
      {...rest}
      id={randomId}
      value={value}
      className="text-black bg-white p-4 mt-4 rounded-lg border outline-none cursor-pointer w-full">
        <option value="">Selecione</option>
        {options && options.length && options.map(option => (
          <option 
            key={option.value}
            value={option.value}>
              {option.text}
            </option>
        ))}
    </select>
  )
}
