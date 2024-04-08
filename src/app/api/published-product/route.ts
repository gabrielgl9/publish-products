import { PublishedProductController } from '@/controllers/PublishedProductController';
import { PublishedProductRepository } from '@/repositories/PublishedProductRepository';
import { PublishedProductService } from '@/services/PublishedProductService';

const published_product_repository = new PublishedProductRepository();
const published_product_service = new PublishedProductService(published_product_repository);
const published_product_controller = new PublishedProductController(published_product_service);

export const GET = published_product_controller.getAll.bind(published_product_controller);
