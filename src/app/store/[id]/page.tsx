'use client'

import Anchor from '@/app/components/anchor';
import Card from '@/app/components/card';
import { IPublishedProduct } from '@/app/interfaces/published-product.interface';
import { fetchApi } from '@/app/utils/fetch-api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Details() {
  const [publishedProduct, setPublishedProduct] = useState<IPublishedProduct>();
  const { id } = useParams()

  useEffect(() => {    
    fetchApi({
      url: '/api/published-product/' + id,
      method: 'GET'
    }).then(response => setPublishedProduct(response))
  }, [id]);

  return (
    <div className='p-4 text-2xl w-1/2 mx-auto'>
      <div className='py-4'>
        #{publishedProduct?.id} - {publishedProduct?.observation}
      </div>

      <Card>
        <div className='flex justify-around items-center my-4'>
          <img src="/image-example.webp" alt="Machine Image" width={350}  />
          <div>
            <p>ID: {publishedProduct?.product.id}</p>
            <p>Product: {publishedProduct?.product.name}</p>
            <p>Price: {publishedProduct?.product.price}</p>
          </div>
        </div>
      </Card>

      <div className='text-center my-4'>
        <Anchor href={'/store'}> Back </Anchor>
      </div>

    </div>
  )
}
