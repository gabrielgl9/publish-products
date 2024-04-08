export interface CreateProductDto {
  name: string
  price: number
}

export interface UpdateProductDto {
  id: number
  name: string
  price: number
}