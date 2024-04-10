import { PublishActionDto, PublishDto } from '@/dtos/PublishDto';
import { PublishedProductEntity } from '@/entities/PublishedProduct';
import { IProductRepository } from '@/repositories/IProductRepository';
import { IPublishedProductRepository } from '@/repositories/IPublishedProductRepository';
import { IUnpublishedProductRepository } from '@/repositories/IUnpublishedProductRepository';
import { CreatePublishSchema, DeletePublishSchema, UpdatePublishSchema } from './PublishSchema';

export class PublishService {
  private operations_method = [
    this.createNewPublish.bind(this),
    this.updatePublish.bind(this),
    this.deletePublish.bind(this)
  ];

  constructor(
    protected unpublished_product_repository: IUnpublishedProductRepository,
    protected published_product_repository: IPublishedProductRepository,
    protected product_repository: IProductRepository
  ) {}

  async publish({unpublished_product_id, observation}: PublishDto): Promise<PublishedProductEntity | { message: string}> { 
    const unpublished_product = await this.unpublished_product_repository.findOne(unpublished_product_id)
    if (!unpublished_product) {
      throw new Error("Unpublished product does not exists.")
    }

    const publish = await this.operations_method[unpublished_product.operation_id - 1]({
      deleted_product_id: unpublished_product.deleted_product_id, 
      new_product_id: unpublished_product.new_product_id, 
      observation
    })

    if (unpublished_product.operation_id !== 3) {
      await this.unpublished_product_repository.delete(unpublished_product_id)
    }

    return publish
  }

  private async createNewPublish({new_product_id, observation}: PublishActionDto): Promise<PublishedProductEntity> {
    const validated_data = CreatePublishSchema.parse({
      new_product_id,
      observation,
    })

    return await this.published_product_repository.store({
      observation,
      product_id: validated_data.new_product_id
    })
  }

  private async updatePublish({deleted_product_id, new_product_id, observation}: PublishActionDto): Promise<PublishedProductEntity> {
    const validated_data = UpdatePublishSchema.parse({
      new_product_id,
      deleted_product_id,
      observation,
    })

    await this.unpublished_product_repository.updateByDeletedProduct(validated_data.deleted_product_id, validated_data.new_product_id)
    await this.published_product_repository.deleteByProduct(validated_data.deleted_product_id)
    await this.product_repository.delete(validated_data.deleted_product_id)

    return await this.published_product_repository.store({
      observation,
      product_id: validated_data.new_product_id
    })
  }

  private async deletePublish({deleted_product_id}: PublishActionDto): Promise<{ message: string}> {
    const validated_data = DeletePublishSchema.parse({
      deleted_product_id,
    })

    await this.unpublished_product_repository.deleteByDeletedProduct(validated_data.deleted_product_id)
    await this.published_product_repository.deleteByProduct(validated_data.deleted_product_id)
    await this.product_repository.delete(validated_data.deleted_product_id)

    return {
      message: 'product deleted successfully'
    }
  }
}