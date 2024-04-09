import { CreateProductDto, UpdateProductDto } from '@/dtos/ProductDto';
import { ProductEntity } from '@/entities/Product';
import { PrismaClient } from '@prisma/client';
import { IProductRepository } from '../IProductRepository';

export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findFirstOrThrow({
      where: {
        id
      }
    });

    return product
  }

  async store({name, price}: CreateProductDto): Promise<ProductEntity> {
    const product = await this.prisma.product.create({
      data: {
        name,
        price
      }
    });

    return product
  }

  async update({id, name, price}: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        price
      }
    });

    return product
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id }
    });
  }
}