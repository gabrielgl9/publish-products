import { CreatePublishedProductDto } from '@/dtos/PublishedProductDto';
import { PublishedProductEntity } from '@/entities/PublishedProduct';
import { PrismaClient } from '@prisma/client';
import { IPublishedProductRepository } from '../IPublishedProductRepository';

const prisma = new PrismaClient();

export class PublishedProductRepository implements IPublishedProductRepository {

  async getAll(): Promise<PublishedProductEntity[]> {
    return await prisma.publishedProduct.findMany({
      include: {
        product: true
      }
    });
  }

  async findOne(id: number): Promise<PublishedProductEntity> {
    const published_product = await prisma.publishedProduct.findFirstOrThrow({
      where: {
        id
      }, 
      include: {
        product: true
      }
    });

    return published_product
  }

  async store({observation, product_id}: CreatePublishedProductDto): Promise<PublishedProductEntity> {
    const published_product = await prisma.publishedProduct.create({
      data: {
        observation,
        product_id
      },
      include: {
        product: true
      }
    });

    return published_product
  }

  async delete(id: number): Promise<void> {
    await prisma.publishedProduct.delete({
      where: { id },
    });
  }

  async deleteByProduct(product_id: number): Promise<void> {
    await prisma.publishedProduct.deleteMany({
      where: { 
        product_id
       },
    });
  }
}