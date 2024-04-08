import { IProduct } from '../interfaces/product.interface'

interface IProductCard {
  product: IProduct
  publishedProductId: number
}

export default function ProductCard({ product, publishedProductId }: IProductCard) {
  const { id, name, price } = product;
  
  return (
    <div className='rounded-md bg-white'>
      <img src="image-example.webp" alt="" />
      <div className='flex justify-between p-4'>
        <span className='text-lg'>#{id} - {name}</span>
        <span className='text-3xl'>{price} U$ </span>
      </div>
      <div className='flex items-center justify-center w-full'>
        <a href={`/store/${publishedProductId}`} className='bg-black text-white p-4 w-full text-center'>
          See Details
        </a>
      </div>
    </div>
  )
}
