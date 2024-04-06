import { PublishedProduct } from '@/entities/PublishedProduct';
import { PublishedProductRepository } from './../repositories/PublishedProductRepository';
import { CreatePublishedProductDto, UpdatePublishedProductDto } from '@/dtos/PublishedProductDto';

export class PublishedProductService {
  constructor(
    protected published_product_repository: PublishedProductRepository
  ) {}

  async findOne(id: number): Promise<PublishedProduct> {
    const published_product = await this.published_product_repository.findOne(id);
    if (!published_product) {
      throw new Error("published product doesn't exists");
    }
    
    return published_product
  }

  async getAll(): Promise<PublishedProduct[]> {
    return await this.published_product_repository.getAll();
  }

  async store({name, price}: CreatePublishedProductDto): Promise<PublishedProduct> {
    const published_product = this.published_product_repository.store({
      name, price
    })

    return published_product
  }

  async update({ id, name, price }: UpdatePublishedProductDto): Promise<PublishedProduct> {
    const published_product_exists = await this.published_product_repository.findOne(id);
    if (!published_product_exists) {
      throw new Error("published product doesn't exists");
    }
    
    const published_product_updated = await this.published_product_repository.update({ id, name, price });

    return published_product_updated
  }

  async delete(id: number): Promise<void> {
    const published_product_exists = await this.published_product_repository.findOne(id);
    if (!published_product_exists) {
      throw new Error("published product doesn't exists");
    }

    const published_product_deleted = await this.published_product_repository.delete(id);

    return published_product_deleted
  }
}