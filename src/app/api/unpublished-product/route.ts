import { UnpublishedProductController } from "@/controllers/UnpublishedProductController";
import { ProductRepository } from "@/repositories/prismadb/ProductRepository";
import { UnpublishedProductRepository } from "@/repositories/prismadb/UnpublishedProductRepository";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";

const unpublished_product_repository = new UnpublishedProductRepository();
const product_repository = new ProductRepository();
const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository, product_repository);
const unpublished_product_controller = new UnpublishedProductController(unpublished_product_service);

export const GET = unpublished_product_controller.getAll.bind(unpublished_product_controller);
export const POST = unpublished_product_controller.store.bind(unpublished_product_controller);