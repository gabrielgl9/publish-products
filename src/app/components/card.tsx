import React, { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export default function Card({children}: CardProps) {
  return (
    <div className='rounded-md bg-white p-4'>
      {children}
    </div>
  )
}
