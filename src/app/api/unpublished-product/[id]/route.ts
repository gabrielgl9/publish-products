import { UnpublishedProductController } from "@/controllers/UnpublishedProductController";
import { UnpublishedProductRepository } from "@/repositories/UnPublishedProductRepository";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";

const unpublished_product_repository = new UnpublishedProductRepository();
const unpublished_product_service = new UnpublishedProductService(unpublished_product_repository);
const unpublished_product_controller = new UnpublishedProductController(unpublished_product_service);

export const GET = unpublished_product_controller.findOne.bind(unpublished_product_controller);
export const PUT = unpublished_product_controller.update.bind(unpublished_product_controller);
export const DELETE = unpublished_product_controller.delete.bind(unpublished_product_controller);