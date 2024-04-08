import { CreateUnpublishedProductDto, UpdateUnpublishedProductDto } from '@/dtos/UnpublishedProductDto';
import { UnpublishedProductEntity } from '@/entities/UnpublishedProduct';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UnpublishedProductRepository {

  async getAll(): Promise<UnpublishedProductEntity[]> {
    const unpublishedProducts = await prisma.unpublishedProduct.findMany({
      include: {
        new_product: true,
        deleted_product: true
      },
    });

    return unpublishedProducts;
  }

  async findOne(id: number): Promise<UnpublishedProductEntity> {
    const unpublished_product = await prisma.unpublishedProduct.findFirstOrThrow({
      where: {
        id
      },
      include: {
        new_product: true,
        deleted_product: true
      }
    });

    return unpublished_product
  }

  async store({operation_id, deleted_product_id, new_product_id}: CreateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    const unpublished_product = await prisma.unpublishedProduct.create({
      data: {
        deleted_product_id,
        operation_id,
        new_product_id
      }, 
      include: {
        new_product: true,
        deleted_product: true
      }
    });

    return unpublished_product
  }

  async update({ id, operation_id, deleted_product_id, new_product_id }: UpdateUnpublishedProductDto): Promise<UnpublishedProductEntity> {
    
    const updated_unpublished_product = await prisma.unpublishedProduct.update({
      where: { id },
      data: {
        operation_id,
        new_product_id,
        deleted_product_id
      }, 
      include: {
        new_product: true,
        deleted_product: true
      }
    });

    return updated_unpublished_product;
  }

  async delete(id: number): Promise<void> {
    await prisma.unpublishedProduct.delete({
      where: { id },
    });
  }
}