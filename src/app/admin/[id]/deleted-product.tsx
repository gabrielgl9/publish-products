'use client'

import Card from '@/app/components/card';
import Select from '@/app/components/select';
import { IPublishedProduct } from '@/app/interfaces/published-product.interface';
import { fetchApi } from '@/app/utils/fetch-api';
import React, { useEffect, useState } from 'react'

interface DeletedProductProps {
  deletedProductId: string
  setDeletedProductId: (id: string) => void
}

export default function DeletedProduct({
  deletedProductId, 
  setDeletedProductId
}: DeletedProductProps) {
  const [publishedProducts, setPublishedProducts] = useState<IPublishedProduct[]>([]);

  useEffect(() => {    
    fetchApi({
      url: '/api/published-product',
      method: 'GET'
    }).then(response => {
      setPublishedProducts(response.data)
    })
  }, []);

  return (
    <Card>
      <h3 className='mb-2 text-2xl text-center'>Deleted Product</h3>
      <Select 
        value={deletedProductId} 
        onChange={(e) => setDeletedProductId((e.target as HTMLInputElement).value)}
        options={
          publishedProducts.length > 0 ?
            publishedProducts.map(publishedProduct => {
              return {
                value: publishedProduct.product.id,
                text: publishedProduct.product.name
              }
            }) : []
        }
      />
    </Card>
  )
}
