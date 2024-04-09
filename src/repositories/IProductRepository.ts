import { CreateProductDto, UpdateProductDto } from "@/dtos/ProductDto";
import { ProductEntity } from "@/entities/Product";

export interface IProductRepository {
  findOne(id: number): Promise<ProductEntity>;
  store(data: CreateProductDto): Promise<ProductEntity>;
  update(data: UpdateProductDto): Promise<ProductEntity>;
  delete(id: number): Promise<void>;
}
