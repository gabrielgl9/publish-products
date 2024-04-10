import { CreateUnpublishedProductDto, UpdateUnpublishedProductDto } from '@/dtos/UnpublishedProductDto';
import { UnpublishedProductEntity } from '@/entities/UnpublishedProduct';
import { IUnpublishedProductRepository } from '../IUnpublishedProductRepository';

export class UnpublishedProductRepository implements IUnpublishedProductRepository {
  private unpublished_products: UnpublishedProductEntity[] = [];
  private next_id: number = 1;

  async getAll(): Promise<UnpublishedProductEntity[]> {
    return this.unpublished_products;
  }

  async findOne(id: number): Promise<UnpublishedProductEntity | null> {
    return this.unpublished_products.find(p => p.id === id) || null;
  }

  async store({ operation_id, deleted_product_id, new_product_id }: CreateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    const new_unpublished_product = {
      id: this.next_id++,
      operation_id,
      deleted_product_id: deleted_product_id || null,
      new_product_id: new_product_id || null,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.unpublished_products.push(new_unpublished_product);
    return new_unpublished_product;
  }

  async update({ id, operation_id, deleted_product_id, new_product_id }: UpdateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    const index = this.unpublished_products.findIndex(p => p.id === id);
    if (index === 1) {
      throw new Error('Unpublished product does not exists.');
    }

    this.unpublished_products[index] = {
      ...this.unpublished_products[index],
      operation_id,
      deleted_product_id: deleted_product_id || null,
      new_product_id: new_product_id || null
    };

    return this.unpublished_products[index];

  }

  async updateByDeletedProduct(oldDeletedProductId: number, newDeletedProductId: number): Promise<void> {
    this.unpublished_products.forEach(unpublished_product => {
      if (unpublished_product.deleted_product_id === oldDeletedProductId) {
        unpublished_product.deleted_product_id = newDeletedProductId;
      }
    });
  }

  async delete(id: number): Promise<void> {
    const index = this.unpublished_products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.unpublished_products.splice(index, 1);
    }
  }

  async deleteByDeletedProduct(deleted_product_id: number): Promise<void> {
    this.unpublished_products = this.unpublished_products.filter(
      product => product.deleted_product_id !== deleted_product_id
    );
  }
}