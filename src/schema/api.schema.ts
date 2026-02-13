import { z } from "zod";

// Generic factory function that creates a success response schema
export const createSuccessResponse = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    status: z.literal("success"),
    data: dataSchema,
    message: z.string(),
  });

// Standardized error response schema
export const errorResponseSchema = z.object({
  status: z.enum(["error", "fail"]),
  message: z.string(),
  error: z.string().optional(),
});

// Generic API response factory (Discriminated Union)
export const createApiResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.discriminatedUnion("status", [
    createSuccessResponse(dataSchema),
    errorResponseSchema,
  ]);

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export type SuccessResponse<T> = {
  status: "success";
  message: string;
  data: T;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
