import { PublishedProductEntity } from "@/entities/PublishedProduct";
import { ProductRepository } from "@/repositories/in-memory/ProductRepository";
import { PublishedProductRepository } from "@/repositories/in-memory/PublishedProductRepository";
import { UnpublishedProductRepository } from "@/repositories/in-memory/UnpublishedProductRepository";
import { PublishService } from "@/services/PublishService";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";
import { createPublishFake, createUnpublishedProductFake } from "../faker";
import { PublishedProductService } from "@/services/PublishedProductService";

const published_product_repository = new PublishedProductRepository();
const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();

const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);
const published_product_service = new PublishedProductService(published_product_repository);
const publish_service = new PublishService(
  unpublished_product_repository, 
  published_product_repository,
  product_repository, 
);

test('should delete a published product successfully', async () => {
  const unpublish_product = await createUnpublishedProductFake(unpublished_product_service)
  const new_published_product = await createPublishFake(publish_service, unpublish_product.id) as PublishedProductEntity

  expect(new_published_product.product_id).toBe(unpublish_product.new_product_id)

  const request_body = {
    deleted_product_id: new_published_product.id,
    operation_id: 3
  }
  const deleted_unpublished_product = await createUnpublishedProductFake(unpublished_product_service, request_body)
  const deleted_published_product = await createPublishFake(publish_service, deleted_unpublished_product.id) as { message: string}

  expect(deleted_published_product.message).toBe('product deleted successfully')

  try {
    await published_product_service.findOne(new_published_product.id)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Published product does not exists.');
  }
});