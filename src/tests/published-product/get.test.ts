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
const published_product_service = new PublishedProductService(published_product_repository);
const publish_service = new PublishService(
  unpublished_product_repository, 
  published_product_repository,
  product_repository, 
);

test('should get all empty published product successfully', async () => {
  const response = await published_product_service.getAll()

  expect(response).toStrictEqual([])
});

test('should get all published product successfully', async () => {
  const unpublish_product = await createUnpublishedProductFake(unpublished_product_service)
  const new_published_product = await createPublishFake(publish_service, unpublish_product.id)

  const response = await published_product_service.getAll()
  expect(response[0]).toBe(new_published_product)
});

test('should get one published product successfully', async () => {
  const unpublish_product = await createUnpublishedProductFake(unpublished_product_service)
  const new_published_product = await createPublishFake(
    publish_service, unpublish_product.id
  ) as PublishedProductEntity

  const response = await published_product_service.findOne(new_published_product.id)
  expect(response).toBe(new_published_product)
});

test('should get error to try finding inexistent published product', async () => {
  try {
    await published_product_service.findOne(999)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Published product does not exists.');
  }
});