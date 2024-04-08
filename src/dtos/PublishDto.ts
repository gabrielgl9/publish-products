export interface PublishDto {
  unpublished_id: number
  observation?: string
}

export interface PublishActionDto {
  deleted_product_id: number | null, 
  new_product_id: number | null, 
  observation?: string
}