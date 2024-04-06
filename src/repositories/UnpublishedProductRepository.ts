import { CreateUnpublishedProductDto } from '@/dtos/UnpublishedProductDto';
import { UnpublishedProductEntity } from '@/entities/UnPublishedProduct';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UnpublishedProductRepository {

  async getAll(): Promise<UnpublishedProductEntity[]> {
    return await prisma.unpublishedProduct.findMany();
  }

  async findOne(id: number): Promise<UnpublishedProductEntity | null> {
    const unpublished_product = await prisma.unpublishedProduct.findFirst({
      where: {
        id
      }
    });

    return unpublished_product
  }

  async store({name, price, operation_id, published_product_id}: CreateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    const unpublished_product = await prisma.unpublishedProduct.create({
      data: {
        name,
        price,
        operation_id,
        published_product_id
      }
    });

    return unpublished_product
  }

  async update({ id, name, price }: UpdateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    const updated_unpublished_product = await prisma.unpublishedProduct.update({
      where: { id },
      data: {
        name,
        price
      }
    });

    return updated_unpublished_product;
  }

  async delete(id: number): Promise<void> {
    await prisma.unpublishedProduct.delete({
      where: { id }
    });
  }
}