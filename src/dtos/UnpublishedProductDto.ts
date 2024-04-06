export interface CreateUnpublishedProductDto {
  name: string
  price: number
  published_product_id: number
  operation_id: number
}

export interface UpdateUnpublishedProductDto {
  id: number
  name: string
  price: number
  published_product_id: number
  operation_id: number
}