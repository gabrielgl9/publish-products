import { ZodError } from "zod";
import { createUnpublishedProductFake } from "../faker";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";
import { ProductRepository } from "@/repositories/in-memory/ProductRepository";
import { UnpublishedProductRepository } from "@/repositories/in-memory/UnpublishedProductRepository";

const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();
const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);

test('should update a unpublished product successfully', async () => {
  const unpublished_product = await createUnpublishedProductFake(unpublished_product_service)

  const request_body = {
    id: unpublished_product.id,
    new_product: {
      id: Number(unpublished_product.new_product_id),
      name: "Machine ABC",
      price: 4000
    },
    deleted_product_id: undefined,
    operation_id: 2
  }

  const response = await unpublished_product_service.update(request_body)

  expect(response).toHaveProperty('id');
  expect(typeof response.id).toBe('number');
});

test('should get validation schema error to update a unpublished product', async () => {
  const unpublished_product = await createUnpublishedProductFake(unpublished_product_service)

  const request_body = {
    id: unpublished_product.id,
    new_product: {
      id: Number(unpublished_product.new_product_id),
      name: "Machine ZWX",
      price: 0
    },
    deleted_product_id: undefined,
    operation_id: 2
  }

  try {
    await unpublished_product_service.update(request_body)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(ZodError);
    expect((error as ZodError).errors[0].message).toBe('Price must be at least 0.01')
  }
});

test('should get error to try updating inexistent unpublished product', async () => {
  const request_body = {
    id: 9999,
    new_product: {
      id: 9999,
      name: "Machine DEF",
      price: 9999
    },
    deleted_product_id: undefined,
    operation_id: 2
  }

  try {
    await unpublished_product_service.update(request_body)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Unpublished product does not exists.');
  }
});
