import { PublishedProductEntity } from "@/entities/PublishedProduct";
import { ProductRepository } from "@/repositories/in-memory/ProductRepository";
import { PublishedProductRepository } from "@/repositories/in-memory/PublishedProductRepository";
import { UnpublishedProductRepository } from "@/repositories/in-memory/UnpublishedProductRepository";
import { PublishService } from "@/services/PublishService";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";
import { createPublishFake, createUnpublishedProductFake } from "../faker";

const published_product_repository = new PublishedProductRepository();
const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();

const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);
const publish_service = new PublishService(
  unpublished_product_repository, 
  published_product_repository,
  product_repository, 
);

test('should store an unpublished product to remove an existing published product (in the future) successfully', async () => {
  const unpublished_product = await createUnpublishedProductFake(unpublished_product_service)
  const published_product = await createPublishFake(publish_service, unpublished_product.id) as PublishedProductEntity
  
  const request_body = {
    deleted_product_id: published_product.product_id,
    operation_id: 3
  }

  const new_unpublished_product = await createUnpublishedProductFake(unpublished_product_service, request_body)

  expect(new_unpublished_product.deleted_product_id).toBe(published_product.product_id);
});

test('should get error to create an unpublished product to remove a inexistent published product', async () => { 
  const request_body = {
    deleted_product_id: 999,
    operation_id: 3
  }

  try {
    await createUnpublishedProductFake(unpublished_product_service, request_body)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Product does not exists.');
  }
});
