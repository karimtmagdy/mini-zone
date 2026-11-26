import { z } from "zod/v4"

const STATUSES = ["active", "inactive", "archive"] as const

export const createBrandZod = z.object({
  name: z
    .string({ message: "brand name is required" })
    .trim()
    .min(2, "brand name must be at least 2 characters")
    .max(30, "brand name must be at most 30 characters"),
  status: z
    .enum(STATUSES, { message: "Invalid status" })
    .default("inactive"),
})

export const updateBrandZod = z.object({
  name: z
    .string({ message: "brand name is required" })
    .trim()
    .min(2, "brand name must be at least 2 characters")
    .max(30, "brand name must be at most 30 characters"),
  status: z.enum(STATUSES, { message: "Invalid status" }),
})

export type TCreateBrandDTO = z.input<typeof createBrandZod>
export type TCreateBrandEX = z.output<typeof createBrandZod>
export type TUpdateBrandDTO = z.input<typeof updateBrandZod>
export type TUpdateBrandEX = z.output<typeof updateBrandZod>

export const BRAND_STATUS_OPTIONS = STATUSES.map((value) => ({
  label: value,
  value,
}))
