import { CreateUnpublishedProductDto, UpdateUnpublishedProductDto } from "@/dtos/UnpublishedProductDto";
import { UnpublishedProductEntity } from "@/entities/UnpublishedProduct";

export interface IUnpublishedProductRepository {
  getAll(): Promise<UnpublishedProductEntity[]>;
  findOne(id: number): Promise<UnpublishedProductEntity | null>;
  store(data: CreateUnpublishedProductDto): Promise<UnpublishedProductEntity>;
  update(data: UpdateUnpublishedProductDto): Promise<UnpublishedProductEntity>;
  updateByDeletedProduct(old_deleted_product_id: number, new_deleted_product_id: number): Promise<void>;
  delete(id: number): Promise<void>;
  deleteByDeletedProduct(deleted_product_id: number): Promise<void>;
}