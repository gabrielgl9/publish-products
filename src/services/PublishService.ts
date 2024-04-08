import { PublishActionDto, PublishDto } from '@/dtos/PublishDto';
import { PublishedProductEntity } from '@/entities/PublishedProduct';
import { ProductRepository } from '@/repositories/ProductRepository';
import { PublishedProductRepository } from '@/repositories/PublishedProductRepository';
import { UnpublishedProductRepository } from '@/repositories/UnpublishedProductRepository';

export class PublishService {
  private operations_method = [
    this.createNewPublish.bind(this),
    this.updatePublish.bind(this),
    this.deletePublish.bind(this)
  ];

  constructor(
    protected unpublished_product_repository: UnpublishedProductRepository,
    protected published_product_repository: PublishedProductRepository,
    protected product_repository: ProductRepository
  ) {}

  async publish({unpublished_id, observation}: PublishDto) { 
    const unpublished_product = await this.unpublished_product_repository.findOne(unpublished_id)

    const publish = await this.operations_method[unpublished_product.operation_id - 1]({
      deleted_product_id: unpublished_product.deleted_product_id, 
      new_product_id: unpublished_product.new_product_id, 
      observation
    })

    await this.unpublished_product_repository.delete(unpublished_id)

    return publish
  }

  private async createNewPublish({new_product_id, observation}: PublishActionDto): Promise<PublishedProductEntity> {
    if (!new_product_id) {
      throw new Error('new product was not informed')
    }

    return await this.published_product_repository.store({
      observation,
      product_id: new_product_id
    })
  }

  private async updatePublish({deleted_product_id, new_product_id, observation}: PublishActionDto): Promise<PublishedProductEntity> {
    if (!deleted_product_id) {
      throw new Error('deleted product was not informed')
    }

    if (!new_product_id) {
      throw new Error('new product was not informed')
    }

    await this.published_product_repository.deleteByProduct(deleted_product_id)
    await this.product_repository.delete(deleted_product_id)

    return await this.published_product_repository.store({
      observation,
      product_id: new_product_id
    })
  }

  private async deletePublish({deleted_product_id}: PublishActionDto): Promise<object> {
    if (!deleted_product_id) {
      throw new Error('deleted product was not informed')
    }

    await this.published_product_repository.deleteByProduct(deleted_product_id)
    await this.product_repository.delete(deleted_product_id)

    return {
      message: 'product deleted successfully'
    }
  }
}