import { CreatePublishedProductDto, UpdatePublishedProductDto } from '@/dtos/PublishedProductDto';
import { PublishedProduct } from '@/entities/PublishedProduct';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PublishedProductRepository {

  async getAll(): Promise<PublishedProduct[]> {
    return await prisma.publishedProduct.findMany();
  }

  async findOne(id: number): Promise<PublishedProduct | null> {
    const published_product = await prisma.publishedProduct.findFirst({
      where: {
        id
      }
    });

    return published_product
  }

  async store({name, price}: CreatePublishedProductDto): Promise<PublishedProduct> {
    const published_product = await prisma.publishedProduct.create({
      data: {
        name,
        price
      }
    });

    return published_product
  }

  async update({ id, name, price }: UpdatePublishedProductDto): Promise<PublishedProduct> {
    const updated_published_product = await prisma.publishedProduct.update({
      where: { id },
      data: {
        name,
        price
      }
    });

    return updated_published_product;
  }

  async delete(id: number): Promise<void> {
    console.log(id)
    await prisma.publishedProduct.delete({
      where: { id }
    });
  }
}