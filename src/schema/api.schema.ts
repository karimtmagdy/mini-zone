import { z } from "zod";
export const dateZod = z.object({
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime(),
});
export const queryZod = z.object({
  search: z.string().min(1).default(""),
  sort: z
    .string()
    .regex(/^(-?[a-zA-Z_]+)(,-?[a-zA-Z_]+)*$/)
    .default("-createdAt"),
  page: z.coerce.number().int().positive().min(1).default(1),
  limit: z.coerce.number().int().positive().min(1).max(50).default(10),
  skip: z.number().default(0),
  fields: z.string().default(""),
});
export const paginationZod = z.object({
  page: z.coerce.number().int().positive().min(1).default(1),
  limit: z.coerce.number().int().positive().min(1).max(50).default(10),
  total: z.coerce.number().int().positive().default(0),
  pages: z.coerce.number().int().positive().default(0),
  results: z.coerce.number().int().positive().default(0),
});
export const baseResponseZod = z.object({
  status: z.enum(["success", "fail", "error"]),
  message: z.string().optional(),
});

export const responseWithMetaZod = baseResponseZod.extend({
  data: z.unknown().optional(),
  meta: paginationZod.optional(),
});

export const responseZod = baseResponseZod.extend({
  data: z.unknown(),
});
