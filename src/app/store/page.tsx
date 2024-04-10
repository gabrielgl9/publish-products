'use client'

import { useEffect, useState } from 'react';
import { IPublishedProduct } from '../interfaces/published-product.interface';
import ProductCard from './product-card';
import { fetchApi } from '../utils/fetch-api';

export default function Page() {
  const [publishedProducts, setPublishedProducts] = useState<IPublishedProduct[]>([]);

  useEffect(() => {
    fetchApi({
      url: '/api/published-product',
      method: 'GET'
    }).then(response => setPublishedProducts(response.data))
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <h3 className='text-3xl'>Machine Store</h3>
        <p className='pb-2 text-lg'>Welcome to the best machine store!</p>
      </div>
      <div className='grid gap-8 grid-cols-2 md:grid-cols-4 py-12'>
        {publishedProducts.length > 0 && publishedProducts.map(publishedProduct => (
          <ProductCard key={publishedProduct.id} product={publishedProduct.product} publishedProductId={publishedProduct.id} />
        ))}
      </div>
    </div>
  )
}
