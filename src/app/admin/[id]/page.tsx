'use client'

import { IPublishedProduct } from '@/app/interfaces/published-product.interface';
import { IUnpublishedProduct } from '@/app/interfaces/unpublished-product.interface';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Details() {
  const [unpublishedProduct, setUnpublishedProduct] = useState<IUnpublishedProduct>();
  const [publishedProducts, setPublishedProducts] = useState<IPublishedProduct[]>([]);

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [observation, setObservation] = useState('')
  const [deletedProductId, setDeletedPublishedProductId] = useState('')

  const { id } = useParams()

  useEffect(() => {    
    fetch('/api/unpublished-product/' + id)
      .then(response => response.json())
      .then(response => {
        setUnpublishedProduct(response)
        setName(response.new_product?.name)
        setPrice(response.new_product?.price)
        setDeletedPublishedProductId(response.deleted_product_id)
      })
      .catch(error => console.error('Erro ao fazer a requisição:', error));

    fetch('/api/published-product')
      .then(response => response.json())
      .then(response => {
        setPublishedProducts(response.data)
      })
      .catch(error => console.error('Erro ao fazer a requisição:', error));

  }, [id]);

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch('/api/unpublished-product/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation_id: unpublishedProduct?.operation.id,
          deleted_product_id: deletedProductId ? Number(deletedProductId) : undefined,
          new_product: unpublishedProduct?.new_product ? {
            id: unpublishedProduct?.new_product.id,
            name,
            price: Number(price) 
          } : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Error to send data');
      }

    } catch (error) {
      console.error('Error to send data:', error);
    }
  }

  const handleDeleteSubmit = async () => {
    try {
      const response = await fetch('/api/unpublished-product/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Error to send data');
      }

      window.location.href = '/admin';
    } catch (error) {
      console.error('Error to send data:', error);
    }
  }

  const handlePublishSubmit = async () => {
    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          unpublished_product_id: unpublishedProduct?.id,
          observation
        })
      });

      if (!response.ok) {
        throw new Error('Error to send data');
      }

      window.location.href = '/admin';
    } catch (error) {
      console.error('Error to send data:', error);
    }
  }

  return (
    <div className='px-4'>
      <div className='p-4 text-2xl'>
        <div className='flex flex-col items-center'>
          <span>
            ID: #{unpublishedProduct?.id}
          </span>
          <span>
            Operation: {unpublishedProduct?.operation.description}
          </span>
        </div>
        
        <div className='flex justify-center gap-2'>
          {unpublishedProduct?.new_product && (
            <div className='bg-white rounded-md p-4 mt-4 w-1/3'>
              <h3 className='mb-2 text-2xl text-center'>New Product</h3>
              <p>ID: {unpublishedProduct?.new_product.id}</p>
              <div>
                <input 
                  type="text" 
                  className="mt-4 p-4 rounded-lg border outline-none w-full" 
                  placeholder="Product X" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  className="mt-4 p-4 rounded-lg border outline-none w-full"
                  placeholder="4.50" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                />
              </div>
            </div>
          )}

          {unpublishedProduct?.deleted_product && (
            <div className='bg-white rounded-md p-4 mt-4 w-1/3'>
              <h3 className='mb-2 text-2xl text-center'>Deleted Product</h3>
              <select 
                name="deleted_published_product" 
                id="deleted_published_product_id" 
                value={deletedProductId} 
                className="text-black bg-white p-4 rounded-lg border outline-none my-4 cursor-pointer w-full"
                onChange={(e) => setDeletedPublishedProductId(e.target.value)}>
                  {publishedProducts.length > 0 && publishedProducts.map(publishedProduct => (
                    <option key={publishedProduct.id} value={publishedProduct.product.id}> 
                      {publishedProduct.product.id + ' - ' + publishedProduct.product.name }
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className='flex justify-center items-center gap-x-4 w-1/3 mx-auto mt-4'>
          <button className="bg-black text-white p-4 rounded-lg border outline-none w-full" type="button" onClick={handleUpdateSubmit}> Update </button>
          <button className="bg-black text-white p-4 rounded-lg border outline-none w-full" type="button" onClick={handleDeleteSubmit}> Delete </button>
        </div>

        <div className='flex justify-center gap-2 my-4'>
          <div className='bg-white rounded-md p-4 w-1/3'>
            <h3 className='mb-2 text-2xl text-center'>Observation</h3>
            <input 
              type="text" 
              className="mt-4 p-4 rounded-lg border outline-none w-full"
              placeholder="observation" 
              value={observation} 
              onChange={(e) => setObservation(e.target.value)} 
            />
          </div>
        </div>

        <div className='flex flex-col justify-center'>
          <button className="bg-black text-white p-4 rounded-lg border outline-none w-1/3 mx-auto" type="button" onClick={handlePublishSubmit}> Publish </button>
          <a href={`/admin`} className='text-black p-4 text-center mt-2 mx-auto w-[90px]'>
            Back
          </a>
        </div>

      </div>
    </div>
  )
}
