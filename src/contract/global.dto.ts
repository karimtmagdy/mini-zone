import type { ApiResponse, SuccessResponse, ErrorResponse } from "@/schema/api.schema";
// Re-exporting from schema to maintain global contract location while keeping Zod as the truth
export type { ApiResponse as ResponseType, SuccessResponse, ErrorResponse };


export type At = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type Image = {
  secureUrl: string;
  publicId: string | null;
};