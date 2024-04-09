import { ProductRepository } from "@/repositories/in-memory/ProductRepository";
import { PublishedProductRepository } from "@/repositories/in-memory/PublishedProductRepository";
import { PublishedProductService } from "@/services/PublishedProductService";
import { createPublishFake, createUnpublishedProductFake } from "../faker";
import { PublishService } from "@/services/PublishService";
import { UnpublishedProductRepository } from "@/repositories/in-memory/UnpublishedProductRepository";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";
import { PublishedProductEntity } from "@/entities/PublishedProduct";

const published_product_repository = new PublishedProductRepository();
const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();

const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);

const publish_service = new PublishService(
  unpublished_product_repository, 
  published_product_repository,
  product_repository, 
);

test('should create a published product successfully', async () => {
  const unpublish_product = await createUnpublishedProductFake(unpublished_product_service)
  const new_published_product = await createPublishFake(publish_service, unpublish_product.id) as PublishedProductEntity

  expect(new_published_product.product_id).toBe(unpublish_product.new_product_id)
});

test('should get error to publish with an inexistent unpublished product', async () => {
  try {
    await createPublishFake(publish_service, 9999)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Unpublished product does not exists.');
  }
});