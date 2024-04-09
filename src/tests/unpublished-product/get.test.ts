import { ProductRepository } from "@/repositories/in-memory/ProductRepository";
import { UnpublishedProductRepository } from "@/repositories/in-memory/UnpublishedProductRepository";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";
import { createUnpublishedProductFake } from "../faker";

const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();
const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);

test('should get all empty unpublished product successfully', async () => {
  const response = await unpublished_product_service.getAll()

  expect(response).toStrictEqual([])
});

test('should get all unpublished product successfully', async () => {
  const new_unpublished_product = await createUnpublishedProductFake(unpublished_product_service)
  const response = await unpublished_product_service.getAll()

  expect(response[0]).toBe(new_unpublished_product)
});

test('should get one unpublished product successfully', async () => {
  const new_unpublished_product = await createUnpublishedProductFake(unpublished_product_service)
  const response = await unpublished_product_service.findOne(new_unpublished_product.id)

  expect(response).toBe(new_unpublished_product)
});

test('should get error to try finding inexistent unpublished product', async () => {
  try {
    await unpublished_product_service.findOne(999)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Unpublished product does not exists.');
  }
});