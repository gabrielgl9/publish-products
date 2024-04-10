'use client'

import { useEffect, useState } from 'react';
import Anchor from '../components/anchor';
import Button from '../components/button';
import { IUnpublishedProduct } from '../interfaces/unpublished-product.interface';
import { fetchApi } from '../utils/fetch-api';
import UnpublishedCard from './unpublished-card';

export default function Page() {
  const [unpublishedProducts, setUnpublishedProducts] = useState<IUnpublishedProduct[]>([]);

  useEffect(() => {
    fetchApi({
      url: '/api/unpublished-product',
      method: 'GET'
    }).then(response => setUnpublishedProducts(response.data))
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>

      <div className='flex justify-between items-center'>
        <div className='mt-4'>
          <h3 className='text-3xl'>Admin Painel</h3>
          <p className='pb-2 text-lg'>Welcome to the best admin painel!</p>
        </div>

        <div className='w-1/5'>
          <Anchor href='/admin/new-unpublished-product'>
            <Button text='Add new' />
          </Anchor>
        </div>
      </div>

      <div className='grid gap-8 grid-cols-1 md:grid-cols-3 py-12'>
        {unpublishedProducts.length > 0 && unpublishedProducts.map(unpublishedProduct => (
          <UnpublishedCard 
            key={unpublishedProduct.id}
            unpublishedProductId={unpublishedProduct.id} 
            operation={unpublishedProduct.operation}
            new_unpublished_product={unpublishedProduct.new_product} 
            deleted_unpublished_product={unpublishedProduct.deleted_product} 
          />
        ))}
      </div>

    </div>
  )
}
