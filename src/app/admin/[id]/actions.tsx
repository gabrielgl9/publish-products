'use client'

import Button from '@/app/components/button';
import { IUnpublishedProduct } from '@/app/interfaces/unpublished-product.interface';
import { fetchApi } from '@/app/utils/fetch-api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeletedProduct from './deleted-product';
import NewProduct from './new-product';

export default function Actions() {
  const [unpublishedProduct, setUnpublishedProduct] = useState<IUnpublishedProduct>();

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [deletedProductId, setDeletedProductId] = useState('')

  const { id } = useParams()

  const gridCols = !!unpublishedProduct?.new_product?.id && !!unpublishedProduct?.deleted_product?.id ? 2 : 1

  useEffect(() => {    
    fetchApi({
      url: '/api/unpublished-product/' + id,
      method: 'GET'
    }).then(response => {
      setUnpublishedProduct(response)
      setName(response.new_product?.name)
      setPrice(response.new_product?.price)
      setDeletedProductId(response.deleted_product_id)
    })
  }, [id])
  
  const handleUpdateSubmit = async () => {
    try { 
      if (!unpublishedProduct?.operation.id) {
        throw new Error('Operation does not exists')
      }

      if (!unpublishedProduct?.new_product?.id) {
        throw new Error('New product does not exists')
      }

      const requestBody = {
        operation_id: unpublishedProduct.operation.id,
        deleted_product_id: deletedProductId,
        new_product: {
          id: unpublishedProduct.new_product.id,
          name,
          price: Number(price)
        }
      };

      await fetchApi({
        url: '/api/unpublished-product/' + id, 
        method: 'PUT',
        body: requestBody
      })

      window.location.href = '/admin/' + id;
    } catch (error) {
      console.error('Error to send data:', error);
    }
  }

  const handleDeleteSubmit = async () => {
    try {
      await fetchApi({
        url: '/api/unpublished-product/' + id, 
        method: 'DELETE',
      })

      window.location.href = '/admin';
    } catch (error) {
      console.error('Error to send data:', error);
    }
  }

  return (
    <>
      <h3>Operation: {unpublishedProduct?.operation.description} </h3>

      <div className={`grid md:grid-cols-${gridCols} gap-8 mt-4 mx-auto ${gridCols === 2 ? 'w-full' : 'w-1/2'}`}>
        {!!unpublishedProduct?.new_product?.id && 
          <NewProduct 
            id={unpublishedProduct.new_product.id} 
            name={name}
            setName={(name) => setName(name)}
            price={price}
            setPrice={(price) => setPrice(price)}
          />
        }

        {!!unpublishedProduct?.deleted_product?.id && 
          <DeletedProduct
            deletedProductId={deletedProductId}
            setDeletedProductId={setDeletedProductId}
          />
        }
      </div>

      <div className='flex justify-center items-center gap-x-4 w-1/3 mx-auto my-4'>
        <Button type='button' onClick={handleUpdateSubmit} text='Update' />
        <Button type='button' onClick={handleDeleteSubmit} text='Delete' />
      </div>
    </>
  )
}
