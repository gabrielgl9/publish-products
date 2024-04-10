import Anchor from '../components/anchor';
import Button from '../components/button';
import Card from '../components/card';
import { IProduct } from '../interfaces/product.interface'

interface IProductCard {
  product: IProduct
  publishedProductId: number
}

export default function ProductCard({ product, publishedProductId }: IProductCard) {
  const { id, name, price } = product;
  
  return (
    <Card>
      <img src="image-example.webp" alt="" />
      <div className='flex justify-between p-4'>
        <span className='text-lg'>#{id} - {name}</span>
        <span className='text-3xl'>{price} U$ </span>
      </div>

      <Anchor href={`/store/${publishedProductId}`}>
        <Button text='Details' />
      </Anchor>
    </Card>
  )
}
