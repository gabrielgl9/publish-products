import { UnpublishedProductController } from "@/controllers/UnpublishedProductController";
import { ProductRepository } from "@/repositories/in-memory/ProductRepository";
import { UnpublishedProductRepository } from "@/repositories/in-memory/UnpublishedProductRepository";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";

const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();
const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);

test('store new unpublished product', async () => {
  const request_body = {
    new_product: {
      name: "Machine D",
      price: 525.99
    },
    published_product_id: null,
    operation_id: 1
  }

  const response = await unpublished_product_service.store(request_body)

  expect(response).toHaveProperty('id');
  expect(typeof response.id).toBe('number');
});
