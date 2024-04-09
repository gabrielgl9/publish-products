'use client'

import { useEffect, useState } from 'react';
import UnpublishedCard from './unpublished-card';
import { IUnpublishedProduct } from '../interfaces/unpublished-product.interface';

export default function Page() {
  const [unpublishedProducts, setUnpublishedProducts] = useState<IUnpublishedProduct[]>([]);

  useEffect(() => {
    fetch('/api/unpublished-product')
      .then(response => response.json())
      .then(response => setUnpublishedProducts(response.data))
      .catch(error => console.error('Erro ao fazer a requisição:', error));
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <h3 className='text-3xl'>Admin Painel</h3>
        <p className='pb-2 text-lg'>Welcome to the best admin painel!</p>
        <div className='mt-2'>
          <a href={`/admin/new-unpublished-product`} className='bg-black rounded-md text-white p-4 text-center'>
            Add new
          </a>
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
