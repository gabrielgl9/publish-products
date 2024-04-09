import { CreatePublishedProductDto } from "@/dtos/PublishedProductDto";
import { PublishedProductEntity } from "@/entities/PublishedProduct";

export interface IPublishedProductRepository {
  getAll(): Promise<PublishedProductEntity[]>;
  findOne(id: number): Promise<PublishedProductEntity>;
  store(data: CreatePublishedProductDto): Promise<PublishedProductEntity>;
  delete(id: number): Promise<void>;
  deleteByProduct(product_id: number): Promise<void>;
}