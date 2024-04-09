import { PublishController } from "@/controllers/PublishController";
import { ProductRepository } from "@/repositories/prismadb/ProductRepository";
import { PublishedProductRepository } from "@/repositories/prismadb/PublishedProductRepository";
import { UnpublishedProductRepository } from "@/repositories/prismadb/UnpublishedProductRepository";
import { PublishService } from "@/services/PublishService";

const unpublished_product_repository = new UnpublishedProductRepository();
const published_product_repository = new PublishedProductRepository();
const product_repository = new ProductRepository()
const publish_service = new PublishService(
  unpublished_product_repository, 
  published_product_repository,
  product_repository
);
const publish_controller = new PublishController(publish_service);

export const POST = publish_controller.publish.bind(publish_controller);