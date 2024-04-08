import { CreateUnpublishedProductDto, UpdateUnpublishedProductDto } from '@/dtos/UnpublishedProductDto';
import { UnpublishedProductEntity } from '@/entities/UnpublishedProduct';
import { ProductRepository } from '@/repositories/ProductRepository';
import { UnpublishedProductRepository } from '@/repositories/UnpublishedProductRepository';

export class UnpublishedProductService {
  constructor(
    protected unpublished_product_repository: UnpublishedProductRepository,
    protected product_repository: ProductRepository
  ) {}

  async findOne(id: number): Promise<UnpublishedProductEntity> {
    return await this.unpublished_product_repository.findOne(id);
  }

  async getAll(): Promise<UnpublishedProductEntity[]> {
    return await this.unpublished_product_repository.getAll();
  }

  async store({operation_id, deleted_product_id, new_product}: CreateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    if (deleted_product_id) {
      await this.product_repository.findOne(deleted_product_id)
    }

    const new_product_id = new_product ? (await this.product_repository.store(new_product)).id : undefined

    console.log(new_product, new_product_id)
    const unpublished_product = await this.unpublished_product_repository.store({
      operation_id,
      deleted_product_id,
      new_product_id: new_product_id
    })

    return unpublished_product;
  }

  async update({ 
    id, 
    operation_id, 
    new_product,
    deleted_product_id 
  }: UpdateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    await this.unpublished_product_repository.findOne(id);

    if (deleted_product_id) {
      await this.product_repository.findOne(deleted_product_id)
    }

    let new_product_id
    if (new_product) {
      await this.product_repository.findOne(new_product.id)
      new_product_id = (await this.product_repository.update(new_product)).id
    }

    const unpublished_product_updated = await this.unpublished_product_repository.update({ 
      id, 
      operation_id,
      deleted_product_id,
      new_product_id
    });

    return unpublished_product_updated
  }

  async delete(id: number): Promise<void> {
    const unpublished_product = await this.unpublished_product_repository.findOne(id)
    if (unpublished_product.new_product_id) {
      await this.product_repository.delete(unpublished_product.new_product_id)
    }
    
    await this.unpublished_product_repository.delete(id)
  }
}