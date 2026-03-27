import { z } from "zod";

export const createSaleSchema = z.object({
  customer: z.string().trim().min(1, "customer is required"),
  product: z.string().trim().min(1, "product is required"),
  amount: z.coerce.number().positive("amount must be a positive number"),
});

export const rateSaleSchema = z.object({
  score: z.coerce
    .number()
    .int("score must be an integer between 1 and 5")
    .min(1, "score must be an integer between 1 and 5")
    .max(5, "score must be an integer between 1 and 5"),
});

export const rateSaleParamsSchema = z.object({
  id: z.coerce
    .number()
    .int("id must be a positive integer")
    .positive("id must be a positive integer"),
});

export type CreateSaleDto = z.infer<typeof createSaleSchema>;
export type RateSaleDto = z.infer<typeof rateSaleSchema>;
export type RateSaleParamsDto = z.infer<typeof rateSaleParamsSchema>;
