import { ProductRepository } from "@/repositories/in-memory/ProductRepository";
import { UnpublishedProductRepository } from "@/repositories/in-memory/UnpublishedProductRepository";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";
import { createUnpublishedProductFake } from "../faker";

const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();
const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);

test('should delete a unpublished product successfully', async () => {
  const new_unpublished_product = await createUnpublishedProductFake(unpublished_product_service)
  await unpublished_product_service.delete(new_unpublished_product.id)

  try {
    await unpublished_product_service.findOne(new_unpublished_product.id)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Unpublished product does not exists.');
  }

});

test('should get error to try deleting inexistent unpublished product', async () => {
  try {
    await unpublished_product_service.delete(999)
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Unpublished product does not exists.');
  }
});