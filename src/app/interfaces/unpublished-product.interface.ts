import { IOperation } from "./operation.interface"
import { IProduct } from "./product.interface"

export interface IUnpublishedProduct {
  id: number
  operation: IOperation
  deleted_product?: IProduct
  new_product?: IProduct
  created_at: Date
  update_at: Date
}