import { z } from 'zod';

export const CreateUnpublishedProductSchema = z.object({
  operation_id: z.number().int().positive().min(1),
  new_product: z.object({
    name: z.string().min(1, 'Name must have at least 1 character').max(100, 'Name must have at most 100 characters'),
    price: z.number().min(0.01, 'Price must be at least 0.01').max(100000, 'Price must be at most 100000')
  }).optional(),
  deleted_product_id: z.number().int().positive().min(1).optional(),
});

export const UpdateUnpublishedProductSchema = z.object({
  id: z.number().int().positive().min(1),
  operation_id: z.number().int().positive().min(1),
  new_product: z.object({
    id: z.number().int().positive().min(1),
    name: z.string().min(1, 'Name must have at least 1 character').max(100, 'Name must have at most 100 characters'),
    price: z.number().min(0.01, 'Price must be at least 0.01').max(100000, 'Price must be at most 100000')
  }).optional(),
  deleted_product_id: z.number().int().positive().min(1).optional(),
});
