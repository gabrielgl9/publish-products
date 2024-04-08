import { CreateProductDto, UpdateProductDto } from '@/dtos/ProductDto';
import { ProductEntity } from '@/entities/Product';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductRepository {

  async findOne(id: number): Promise<ProductEntity> {
    const product = await prisma.product.findFirstOrThrow({
      where: {
        id
      }
    });

    return product
  }

  async store({name, price}: CreateProductDto): Promise<ProductEntity> {
    const product = await prisma.product.create({
      data: {
        name,
        price
      }
    });

    return product
  }

  async update({id, name, price}: UpdateProductDto): Promise<ProductEntity> {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price
      }
    });

    return product
  }

  async delete(id: number): Promise<void> {
    await prisma.product.delete({
      where: { id }
    });
  }
}