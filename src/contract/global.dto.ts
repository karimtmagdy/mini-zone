import { z } from "zod/v4";
import type {
  errorResponseSchema,
  globalResponseSchema,
  globalResponseWithPaginationSchema,
} from "@/schema/api.schema";

export type At = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type Image = {
  url: string;
  publicId: string | null;
};

// export const emailRegex: RegExp =
//   /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|net|org)$/;

// export const dateParamSchema = z.object({
//   createdAt: z.iso.datetime(),
//   updatedAt: z.iso.datetime(),
//   deletedAt: z.iso.datetime(),
// });

// export const querySchema = z.object({
//   search: z.string().min(1).default(""),
//   sort: z
//     .string()
//     .regex(/^(-?[a-zA-Z_]+)(,-?[a-zA-Z_]+)*$/)
//     .default("-createdAt"),
//   page: z.coerce.number().int().positive().min(1).default(1),
//   limit: z.coerce.number().int().positive().min(1).max(50).default(10),
//   skip: z.number().default(0),
//   fields: z.string().default(""),
// });

// export type QueryString = z.infer<typeof querySchema>;

export type GlobalResponse<T> = Omit<
  z.infer<typeof globalResponseSchema>,
  "data"
> & {
  data: T;
};
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export type SuccessResponse<T> = GlobalResponse<T> & {
  status: "success";
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type GlobalResponseWithPagination<T> = Omit<
  z.infer<typeof globalResponseWithPaginationSchema>,
  "data"
> & {
  data: T;
  // meta: Pagination;
};

export type SuccessResponseWithPagination<T> =
  GlobalResponseWithPagination<T> & {
    status: "success";
  };

export type ApiResponseWithPagination<T> =
  | SuccessResponseWithPagination<T>
  | ErrorResponse;
