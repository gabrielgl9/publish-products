import { IProduct } from "./product.interface"

export interface IPublishedProduct {
  id: number
  observation?: string
  created_at: Date
  update_at: Date
  product: IProduct
}