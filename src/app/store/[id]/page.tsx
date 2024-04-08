'use client'

import { IPublishedProduct } from '@/app/interfaces/published-product.interface';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Details() {
  const [publishedProduct, setPublishedProduct] = useState<IPublishedProduct>();
  const { id } = useParams()

  useEffect(() => {    
    fetch('/api/published-product/' + id)
      .then(response => response.json())
      .then(response => setPublishedProduct(response))
      .catch(error => console.error('Erro ao fazer a requisição:', error));
  }, [id]);

  return (
    <div className='flex flex-col md:flex-row'>
      <div> 
        <img src="/image-example.webp" alt="" />
      </div>
      <div className='p-4 text-2xl'>
        #{publishedProduct?.id} - {publishedProduct?.observation}

        <div className='pt-8'>
          <p>ID: {publishedProduct?.product.id}</p>
          <p>Product: {publishedProduct?.product.name}</p>
          <p>Price: {publishedProduct?.product.price}</p>

          <div className='flex items-center justify-center w-full mt-2'>
            <a href={`/store`} className='bg-black text-white p-4 w-full text-center'>
              Back
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
