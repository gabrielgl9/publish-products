import { CreateUnpublishedProductDto, UpdateUnpublishedProductDto } from '@/dtos/UnpublishedProductDto';
import { UnpublishedProductEntity } from '@/entities/UnpublishedProduct';
import { PrismaClient } from '@prisma/client';
import { IUnpublishedProductRepository } from '../IUnpublishedProductRepository';

const prisma = new PrismaClient();

export class UnpublishedProductRepository implements IUnpublishedProductRepository {

  async getAll(): Promise<UnpublishedProductEntity[]> {
    const unpublishedProducts = await prisma.unpublishedProduct.findMany({
      include: {
        new_product: true,
        deleted_product: true,
        operation: true
      },
    });

    return unpublishedProducts;
  }

  async findOne(id: number): Promise<UnpublishedProductEntity | null> {
    const unpublished_product = await prisma.unpublishedProduct.findFirst({
      where: {
        id
      },
      include: {
        new_product: true,
        deleted_product: true,
        operation: true
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

  async updateByDeletedProduct(old_deleted_product_id: number, new_deleted_product_id: number): Promise<void> {
    await prisma.unpublishedProduct.updateMany({
      where: { 
        deleted_product_id: old_deleted_product_id
      },
      data: {
        deleted_product_id: new_deleted_product_id
      }
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.unpublishedProduct.delete({
      where: { id },
    });
  }

  async deleteByDeletedProduct(deleted_product_id: number): Promise<void> {
    await prisma.unpublishedProduct.deleteMany({
      where: { 
       deleted_product_id,
      },
    });
  }
}