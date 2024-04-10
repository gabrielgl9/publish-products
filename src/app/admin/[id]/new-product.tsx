'use client'

import Card from '@/app/components/card'
import Input from '@/app/components/input'
import React from 'react'

interface NewProductProps {
  id: number
  name: string
  price: string
  setName: (name: string) => void
  setPrice: (price: string) => void
}

export default function NewProduct({
  id, 
  name, 
  price, 
  setName, 
  setPrice
}: NewProductProps) {
  return (
    <Card>
      <h3 className='mb-2 text-2xl text-center'>New Product</h3>
      <p>ID: {id}</p>

      <Input 
        type="text" 
        label='Name'
        placeholder="Product X" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />

      <Input 
        type="text" 
        label='Price'
        placeholder="4.50" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
      />
    </Card>
  )
}
