// publishedProductController.ts

import { UnpublishedProductService } from "@/services/UnpublishedProductService";


export class UnpublishedProductController {
  constructor(
    protected unpublished_product_service: UnpublishedProductService
  ) {}

  async findOne(request: Request): Promise<Response> {
    try {
      const pathname = request.url.split('/');
      const id = Number(pathname[pathname.length - 1]);

      const updated_unpublished_product = await this.unpublished_product_service.findOne(id);
      return Response.json(updated_unpublished_product, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async getAll(): Promise<Response> {
    try {
      const unpublished_products = await this.unpublished_product_service.getAll();
      return Response.json({ data: unpublished_products }, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async store(request: Request): Promise<Response> {    
    try {
      const body = await request.json();
      const unpublished_product = await this.unpublished_product_service.store(body);
      return Response.json(unpublished_product, { status: 201 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async update(request: Request): Promise<Response> {
    try {
      const pathname = request.url.split('/');
      const id = Number(pathname[pathname.length - 1]);

      const body = await request.json();
      const updated_unpublished_product = await this.unpublished_product_service.update({id, ...body});
      return Response.json(updated_unpublished_product, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }

  async delete(request: Request): Promise<Response> {
    try {
      const pathname = request.url.split('/');
      const id = Number(pathname[pathname.length - 1]);
      
      await this.unpublished_product_service.delete(id);
      return Response.json({ message: 'Unpublished product deleted successfully' }, { status: 203 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }
}