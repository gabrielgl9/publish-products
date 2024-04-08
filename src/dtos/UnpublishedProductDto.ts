import { CreateProductDto, UpdateProductDto } from "./ProductDto"

export interface CreateUnpublishedProductDto {
  operation_id: number
  deleted_product_id?: number
  new_product?: CreateProductDto
  new_product_id?: number
}

export interface UpdateUnpublishedProductDto {
  id: number
  operation_id: number
  deleted_product_id?: number
  new_product?: UpdateProductDto
  new_product_id?: number
}