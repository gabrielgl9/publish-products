// publishedProductController.ts
import { PublishedProductService } from '@/services/PublishedProductService';

export class PublishedProductController {
  constructor(
    protected published_product_service: PublishedProductService
  ) {}

  async findOne(request: Request): Promise<Response> {
    try {
      const pathname = request.url.split('/');
      const id = Number(pathname[pathname.length - 1]);

      const updated_published_product = await this.published_product_service.findOne(id);
      return Response.json(updated_published_product, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async getAll(): Promise<Response> {
    try {
      const published_products = await this.published_product_service.getAll();
      return Response.json({ data: published_products }, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }
}