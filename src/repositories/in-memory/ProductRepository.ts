import { CreateProductDto, UpdateProductDto } from '@/dtos/ProductDto';
import { ProductEntity } from '@/entities/Product';
import { IProductRepository } from '../IProductRepository';

export class ProductRepository implements IProductRepository {
  private products: ProductEntity[] = [];
  private nextId: number = 1;

  async findOne(id: number): Promise<ProductEntity> {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Product does not exists.');
    }
    return product;
  }

  async store({ name, price }: CreateProductDto): Promise<ProductEntity> {
    const newProduct: ProductEntity = {
      id: this.nextId++,
      name,
      price,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async update({ id, name, price }: UpdateProductDto): Promise<ProductEntity> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product does not exists.');
    }
    
    this.products[index] = {
      ...this.products[index],
      name,
      price
    };
    return this.products[index];
  }

  async delete(id: number): Promise<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
}