// publishedProductController.ts
import { PublishedProductService } from '@/services/PublishedProductService';

export class PublishedProductController {
  private publishedProductService: PublishedProductService;

  constructor(publishedProductService: PublishedProductService) {
    this.publishedProductService = publishedProductService;
  }

  async findOne(request: Request): Promise<Response> {
    try {
      const pathname = request.url.split('/');
      const id = Number(pathname[pathname.length - 1]);

      const updated_published_product = await this.publishedProductService.findOne(id);
      return Response.json(updated_published_product, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async getAll(): Promise<Response> {
    try {
      const published_products = await this.publishedProductService.getAll();
      return Response.json({ data: published_products }, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async store(request: Request): Promise<Response> {
    const body = await request.json();

    try {
      const published_product = await this.publishedProductService.store(body);
      return Response.json(published_product, { status: 201 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async update(request: Request): Promise<Response> {
    try {
      const pathname = request.url.split('/');
      const id = Number(pathname[pathname.length - 1]);

      const body = await request.json();
      const updated_published_product = await this.publishedProductService.update({id, ...body});
      return Response.json(updated_published_product, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async delete(request: Request): Promise<Response> {
    try {
      const pathname = request.url.split('/');
      const id = Number(pathname[pathname.length - 1]);
      
      await this.publishedProductService.delete(id);
      return Response.json({ message: 'Published product deleted successfully' }, { status: 203 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }
}