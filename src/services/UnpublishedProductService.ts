import { CreateUnpublishedProductDto, UpdateUnpublishedProductDto } from '@/dtos/UnpublishedProductDto';
import { UnpublishedProductEntity } from '@/entities/UnpublishedProduct';
import { UnpublishedProductRepository } from '@/repositories/UnpublishedProductRepository';

export class UnpublishedProductService {
  constructor(
    protected unpublished_product_repository: UnpublishedProductRepository
  ) {}

  async findOne(id: number): Promise<UnpublishedProductEntity> {
    const published_product = await this.unpublished_product_repository.findOne(id);
    if (!published_product) {
      throw new Error("published product doesn't exists");
    }
    
    return published_product
  }

  async getAll(): Promise<UnpublishedProductEntity[]> {
    return await this.unpublished_product_repository.getAll();
  }

  async store({name, price, operation_id, published_product_id}: CreateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    const published_product = this.unpublished_product_repository.store({
      name, 
      price,
      operation_id,
      published_product_id
    })

    return published_product
  }

  async update({ 
    id, 
    name, 
    price, 
    operation_id, 
    published_product_id 
  }: UpdateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    const unpublished_product_exists = await this.unpublished_product_repository.findOne(id);
    if (!unpublished_product_exists) {
      throw new Error("unpublished product doesn't exists");
    }
    
    const unpublished_product_updated = await this.unpublished_product_repository.update({ 
      id, 
      name, 
      price,
      operation_id,
      published_product_id 
    });

    return unpublished_product_updated
  }

  async delete(id: number): Promise<void> {
    const unpublished_product_exists = await this.unpublished_product_repository.findOne(id);
    if (!unpublished_product_exists) {
      throw new Error("published product doesn't exists");
    }

    await this.unpublished_product_repository.delete(id);
  }
}