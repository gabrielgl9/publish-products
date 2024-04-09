import { ZodError } from "zod";
import { createUnpublishedProductFake } from "../faker";
import { UnpublishedProductRepository } from "@/repositories/prismadb/UnpublishedProductRepository";
import { ProductRepository } from "@/repositories/prismadb/ProductRepository";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";

const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();
const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);

test('should store new unpublished product successfully', async () => {
  const response = await createUnpublishedProductFake(unpublished_product_service)

  expect(response).toHaveProperty('id');
  expect(typeof response.id).toBe('number');
});

test('should get validation schema error to store new unpublished product', async () => {
  const request_body = {
    new_product: {
      name: "",
      price: 525.99
    },
    deleted_product_id: undefined,
    operation_id: 1
  }

  try {
    await createUnpublishedProductFake(unpublished_product_service, request_body)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(ZodError);
    expect((error as ZodError).errors[0].message).toBe('Name must have at least 1 character')
  }
});
