import { CreateUnpublishedProductDto, UpdateUnpublishedProductDto } from "@/dtos/UnpublishedProductDto";
import { UnpublishedProductEntity } from "@/entities/UnpublishedProduct";

export interface IUnpublishedProductRepository {
  getAll(): Promise<UnpublishedProductEntity[]>;
  findOne(id: number): Promise<UnpublishedProductEntity | null>;
  store(data: CreateUnpublishedProductDto): Promise<UnpublishedProductEntity>;
  update(data: UpdateUnpublishedProductDto): Promise<UnpublishedProductEntity>;
  delete(id: number): Promise<void>;
}