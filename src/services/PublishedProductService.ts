import { PublishedProductEntity } from '@/entities/PublishedProduct';
import { PublishedProductRepository } from './../repositories/PublishedProductRepository';

export class PublishedProductService {
  constructor(
    protected published_product_repository: PublishedProductRepository
  ) {}

  async findOne(id: number): Promise<PublishedProductEntity> {
    return await this.published_product_repository.findOne(id);    
  }

  async getAll(): Promise<PublishedProductEntity[]> {
    return await this.published_product_repository.getAll();
  }
}