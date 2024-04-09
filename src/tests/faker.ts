import { CreateUnpublishedProductDto } from "@/dtos/UnpublishedProductDto";
import { PublishService } from "@/services/PublishService";
import { UnpublishedProductService } from "@/services/UnpublishedProductService";

export const createUnpublishedProductFake = async (
  unpublished_product_service: UnpublishedProductService,
  unpublished_product_body = {
  new_product: {
    name: "Machine D",
    price: 525.99
  },
  deleted_product_id: undefined,
  operation_id: 1
} as CreateUnpublishedProductDto) => {
  return await unpublished_product_service.store(unpublished_product_body)
}

export const createPublishFake = async (
  published_product_service: PublishService,
  unpublished_product_id: number,
  observation = 'Test Observation'
) => {
  return await published_product_service.publish({ unpublished_product_id, observation })
}
