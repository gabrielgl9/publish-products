import { IOperation } from '../interfaces/operation.interface'
import { IProduct } from '../interfaces/product.interface'

interface IUnpublishedCard {
  new_unpublished_product?: IProduct
  deleted_unpublished_product?: IProduct
  operation: IOperation
  unpublishedProductId: number
}

export default function UnpublishedCard({ 
  new_unpublished_product, 
  deleted_unpublished_product, 
  operation,
  unpublishedProductId 
}: IUnpublishedCard) {
  return (
    <div className='rounded-md bg-white p-4'>
      <span className='text-lg'>Operation: #{operation.id} - {operation.description}</span>

      {new_unpublished_product && (
        <div className='flex justify-between items-center'>
          <span className='text-lg'>New Product: #{new_unpublished_product.id} - {new_unpublished_product.name}</span>
          <span className='text-lg'>{new_unpublished_product.price} U$ </span>
        </div>
      )}

      {deleted_unpublished_product && (
        <div className='flex justify-between items-center'>
          <span className='text-lg'>Deleted Product: #{deleted_unpublished_product.id} - {deleted_unpublished_product.name}</span>
          <span className='text-lg'>{deleted_unpublished_product.price} U$ </span>
        </div>
      )}

      <div className='flex items-center justify-center w-full mt-8'>
        <a href={`/admin/${unpublishedProductId}`} className='bg-black text-white p-4 w-full text-center'>
          See Details
        </a>
      </div>
    </div>
  )
}
