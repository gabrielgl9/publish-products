import React, { AnchorHTMLAttributes, ReactNode } from 'react'

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export default function Anchor({children, ...rest}: AnchorProps) {
  return (
    <a {...rest} className='text-black text-center w-full'>
      {children}
    </a>
  )
}
