import { CreatePublishedProductDto } from '@/dtos/PublishedProductDto';
import { PublishedProductEntity } from '@/entities/PublishedProduct';
import { IPublishedProductRepository } from '../IPublishedProductRepository';

export class PublishedProductRepository implements IPublishedProductRepository {
  private publishedProducts: PublishedProductEntity[] = [];
  private nextId: number = 1;

  async getAll(): Promise<PublishedProductEntity[]> {
    return this.publishedProducts;
  }

  async findOne(id: number): Promise<PublishedProductEntity> {
    const publishedProduct = this.publishedProducts.find(p => p.id === id);
    if (!publishedProduct) {
      throw new Error('Published product not found');
    }
    return publishedProduct;
  }

  async store({ observation, product_id }: CreatePublishedProductDto): Promise<PublishedProductEntity> {
    const newPublishedProduct: PublishedProductEntity = {
      id: this.nextId++,
      observation: observation || null,
      product_id,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    this.publishedProducts.push(newPublishedProduct);
    return newPublishedProduct;
  }

  async delete(id: number): Promise<void> {
    const index = this.publishedProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.publishedProducts.splice(index, 1);
    }
  }

  async deleteByProduct(product_id: number): Promise<void> {
    this.publishedProducts = this.publishedProducts.filter(p => p.product_id !== product_id);
  }
}