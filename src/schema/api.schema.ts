import { z } from "zod";
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().min(1).default(1),
  limit: z.coerce.number().int().positive().min(1).max(50).default(10),
  total: z.coerce.number().int().positive().default(0),
  pages: z.coerce.number().int().positive().default(0),
  results: z.coerce.number().int().positive().default(0),
});
export const baseResponseSchema = z.object({
  status: z.enum(["success", "fail", "error"]),
  message: z.string().optional(),
  // meta: paginationSchema.optional(),
});
export const globalResponseSchema = baseResponseSchema.extend({
  data: z.unknown().optional(),
});
export const globalResponseWithPaginationSchema = baseResponseSchema.extend({
  data: z.unknown().optional(),
  meta: paginationSchema.optional(),
});
export const errorResponseSchema = baseResponseSchema.extend({
  status: z.literal("error"),
  error: z.object({
    code: z.string(),
    details: z.any().optional(),
  }),
});
// Generic factory function that creates a success response schema
export const createSuccessResponse = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    status: z.literal("success"),
    data: dataSchema,
    message: z.string().optional(),
    // meta: paginationSchema.optional(),
  });
export const createSuccessResponseWithPagination = <T extends z.ZodType>(
  dataSchema: T,
) =>
  z.object({
    status: z.literal("success"),
    data: dataSchema,
    message: z.string().optional(),
    meta: paginationSchema.optional(),
  });
// Generic API response factory (Discriminated Union)
export const createApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.discriminatedUnion("status", [
    createSuccessResponse(dataSchema),
    errorResponseSchema,
  ]);
