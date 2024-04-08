import { CreateUnpublishedProductDto, UpdateUnpublishedProductDto } from '@/dtos/UnpublishedProductDto';
import { UnpublishedProductEntity } from '@/entities/UnpublishedProduct';
import { ProductRepository } from '@/repositories/ProductRepository';
import { UnpublishedProductRepository } from '@/repositories/UnpublishedProductRepository';
import { CreateUnpublishedProductSchema, UpdateUnpublishedProductSchema } from './UnpublishedProductSchema';

export class UnpublishedProductService {
  constructor(
    protected unpublished_product_repository: UnpublishedProductRepository,
    protected product_repository: ProductRepository
  ) {}

  async findOne(id: number): Promise<UnpublishedProductEntity> {
    const unpublished_product = await this.unpublished_product_repository.findOne(id)
    if (!unpublished_product) {
      throw new Error("Unpublished product does not exists.")
    }

    return unpublished_product;
  }

  async getAll(): Promise<UnpublishedProductEntity[]> {
    return await this.unpublished_product_repository.getAll();
  }

  async store({operation_id, deleted_product_id, new_product}: CreateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    console.log({operation_id, deleted_product_id, new_product})
    const validated_data = CreateUnpublishedProductSchema.parse({
      operation_id,
      new_product,
      deleted_product_id
    });

    if (validated_data.deleted_product_id) {
      await this.product_repository.findOne(validated_data.deleted_product_id)
    }

    const new_product_id = validated_data.new_product 
      ? (await this.product_repository.store(validated_data.new_product)).id 
      : undefined

    const unpublished_product = await this.unpublished_product_repository.store({
      operation_id: validated_data.operation_id,
      deleted_product_id: validated_data.deleted_product_id,
      new_product_id
    })

    return unpublished_product;
  }

  async update({ 
    id, 
    operation_id, 
    new_product,
    deleted_product_id 
  }: UpdateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    const validated_data = UpdateUnpublishedProductSchema.parse({
      id,
      operation_id,
      new_product,
      deleted_product_id
    });

    const unpublished_product = await this.unpublished_product_repository.findOne(validated_data.id)
    if (!unpublished_product) {
      throw new Error("Unpublished product does not exists.")
    }

    if (validated_data.deleted_product_id) {
      await this.product_repository.findOne(validated_data.deleted_product_id)
    }

    let new_product_id
    if (validated_data.new_product) {
      await this.product_repository.findOne(validated_data.new_product.id)
      new_product_id = (await this.product_repository.update(validated_data.new_product)).id
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
    if (!unpublished_product) {
      throw new Error("Unpublished product does not exists.")
    }

    if (unpublished_product.new_product_id) {
      await this.product_repository.delete(unpublished_product.new_product_id)
    }
    
    await this.unpublished_product_repository.delete(id)
  }
}