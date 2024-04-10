'use client'

import Anchor from "@/app/components/anchor";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Select from "@/app/components/select";
import { IPublishedProduct } from "@/app/interfaces/published-product.interface";
import { fetchApi } from "@/app/utils/fetch-api";
import { useEffect, useState } from "react";

export default function Page() {
  const [publishedProducts, setPublishedProducts] = useState<IPublishedProduct[]>([]);
  const [operationId, setOperationId] = useState('')
  const [deletedProductId, setDeletedProductId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    fetchApi({
      url: '/api/published-product',
      method: 'GET'
    }).then(response => setPublishedProducts(response.data))
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const operationIdNumber = operationId ? Number(operationId) : undefined;
      const deletedProductIdNumber = deletedProductId ? Number(deletedProductId) : undefined;
  
      const requestBody = {
        operation_id: operationIdNumber,
        deleted_product_id: deletedProductIdNumber,
        new_product: operationIdNumber !== 3 ? { name, price: Number(price) } : undefined
      };

      await fetchApi({
        url: '/api/unpublished-product', 
        method: 'POST',
        body: requestBody
      })

      window.location.href = '/admin';
    } catch (error) {
      console.error('Error to send data:', error);
    }
  }

  const showNewProductForm = operationId === '1' || operationId === '2'
  const showDeletedProductForm = operationId === '2' || operationId === '3'

  return (
    <form className='container mx-auto pt-8' onSubmit={handleSubmit}>
      <h3 className="text-3xl text-center">Form to register new unpublished product</h3>
      <p className="text-xl text-center mt-2">
        Fill in all the fields and click the send button
      </p>

      <div className="flex justify-center flex-col bg-white p-8 pb-2 my-12 mx-auto max-w-[800px]">
        <Select 
          value={operationId} 
          onChange={(e) => setOperationId((e.target as HTMLInputElement).value)}
          options={[
            {
              value: '1',
              text: 'Create'
            }, {
              value: '2',
              text: 'Update'
            }, {
              value: '3',
              text: 'Delete'
            }
          ]}
        />

        {showNewProductForm && (
          <>
            <Input 
              type="text"
              placeholder="Product X"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input 
              type="text"
              placeholder="4.50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </>
        )}

        {showDeletedProductForm && (
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
        )}

        <Button type="submit" text="Submit" />

        <div className='text-center my-4'>
          <Anchor href={'/admin'}> Back </Anchor>
        </div>

      </div>
    </form>
  )
}
