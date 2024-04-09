'use client'

import { IPublishedProduct } from "@/app/interfaces/published-product.interface";
import { useEffect, useState } from "react";


export default function Page() {
  const [publishedProducts, setPublishedProducts] = useState<IPublishedProduct[]>([]);
  const [operationId, setOperationId] = useState('')
  const [deletedProductId, setDeletedProductId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    fetch('/api/published-product')
      .then(response => response.json())
      .then(response => setPublishedProducts(response.data))
      .catch(error => console.error('Erro ao fazer a requisição:', error));
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/unpublished-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation_id: operationId ? Number(operationId) : undefined,
          deleted_product_id: deletedProductId ? Number(deletedProductId) : undefined,
          new_product: operationId !== '3' ? {
            name,
            price: Number(price) 
          } : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Error to send data');
      }

      window.location.href = '/admin';
    } catch (error) {
      console.error('Error to send data:', error);
    }
  };


  return (
    <form className='container mx-auto pt-8' onSubmit={handleSubmit}>
      <h3 className="text-3xl text-center">Form to register new unpublished product</h3>
      <p className="text-xl text-center mt-2">
        Fill in all the fields and click the send button
      </p>
      <div className="flex justify-center flex-col bg-white p-8 pb-2 my-12 mx-auto max-w-[800px]">
        <select 
          name="operation" 
          id="operation_id" 
          value={operationId} 
          className="text-black bg-white p-4 rounded-lg border outline-none cursor-pointer"
          onChange={(e) => setOperationId(e.target.value)}>
            <option value="">Selecione</option>
            <option value={'1'}>create</option>
            <option value={'2'}>update</option>
            <option value={'3'}>delete</option>
        </select>

        {(operationId === '1' || operationId === '2') && (
          <>
            <input type="text" className="mt-4 p-4 rounded-lg border outline-none" placeholder="Product X" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" className="mt-4 p-4 rounded-lg border outline-none" placeholder="4.50" value={price} onChange={(e) => setPrice(e.target.value)} />
          </>
        )}

        {(operationId === '2' || operationId === '3') && (
          <select 
            name="deleted_published_product" 
            id="deleted_published_product_id" 
            value={deletedProductId} 
            className="text-black bg-white p-4 rounded-lg border outline-none mt-4 cursor-pointer"
            onChange={(e) => setDeletedProductId(e.target.value)}>
              <option value="">Select</option>
              {publishedProducts.length > 0 && publishedProducts.map(publishedProduct => (
                <option key={publishedProduct.id} value={publishedProduct.product.id}> 
                  {publishedProduct.product.id + ' - ' + publishedProduct.product.name }
                </option>
              ))}
          </select>
        )}

        <button className="bg-black text-white p-4 rounded-lg border outline-none mt-4" type="submit"> Submit </button>
        <a href={`/admin`} className='text-black p-4 text-center mt-2'>
          Back
        </a>
      </div>
    </form>
  )
}
