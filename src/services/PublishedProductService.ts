import { PublishedProductEntity } from '@/entities/PublishedProduct';
import { IPublishedProductRepository } from '@/repositories/IPublishedProductRepository';

export class PublishedProductService {
  constructor(
    protected published_product_repository: IPublishedProductRepository
  ) {}

  async findOne(id: number): Promise<PublishedProductEntity> {
    return await this.published_product_repository.findOne(id);    
  }

  async getAll(): Promise<PublishedProductEntity[]> {
    return await this.published_product_repository.getAll();
  }
}