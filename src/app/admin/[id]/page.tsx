'use client'

import Anchor from '@/app/components/anchor';
import Button from '@/app/components/button';
import Input from '@/app/components/input';
import { IPublishedProduct } from '@/app/interfaces/published-product.interface';
import { IUnpublishedProduct } from '@/app/interfaces/unpublished-product.interface';
import { fetchApi } from '@/app/utils/fetch-api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Actions from './actions';
import Card from '@/app/components/card';

export default function Details() {
  const [observation, setObservation] = useState('')
  const { id } = useParams()

  const handlePublishSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    try {
      await fetchApi({
        url: '/api/publish', 
        method: 'POST',
        body: {
          unpublished_product_id: Number(id),
          observation
        }
      })

      window.location.href = '/admin';
    } catch (error) {
      console.error('Error to send data:', error);
    }
  }

  return (
    <form className='px-8 py-4 text-2xl' onSubmit={handlePublishSubmit}>
      <h3> ID: #{id} </h3>
      <Actions />

      <div className='flex flex-col justify-center w-1/2 mx-auto'>
        <Input 
          type="text" 
          placeholder="Observation" 
          value={observation} 
          onChange={(e) => setObservation(e.target.value)} 
        />  

        <Button type='submit' text='Publish' />
        <div className='text-center my-4'>
          <Anchor href={'/admin'}> Back </Anchor>
        </div>
      </div>
    </form>
  )
}
