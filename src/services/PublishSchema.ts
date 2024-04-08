import { z } from 'zod';

export const CreatePublishSchema = z.object({
  new_product_id: z.number().int().positive().min(1),
  observation: z.string().min(3).max(300).optional(),
});

export const UpdatePublishSchema = z.object({
  new_product_id: z.number().int().positive().min(1),
  deleted_product_id: z.number().int().positive().min(1),
  observation: z.string().min(3).max(300).optional(),
});

export const DeletePublishSchema = z.object({
  deleted_product_id: z.number().int().positive().min(1),
});