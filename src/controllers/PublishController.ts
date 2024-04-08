// publishedProductController.ts
import { PublishService } from '@/services/PublishService';

export class PublishController {
  constructor(
    protected publish_service: PublishService
  ) {}

  async publish(request: Request): Promise<Response> {
    try {
      const body = await request.json();

      const publish = await this.publish_service.publish(body)
      return Response.json(publish, { status: 200 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }
}