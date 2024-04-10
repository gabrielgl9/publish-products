import Anchor from '../components/anchor'
import Button from '../components/button'
import Card from '../components/card'
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
    <Card>
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

      <Anchor href={`/admin/${unpublishedProductId}`}>
        <Button text='Details' />
      </Anchor>

    </Card>
  )
}
