import { z } from "zod/v4";
import { BRAND_STATUS } from "../contract/brand.dto";

export const brandZod = z
  .object({
    name: z
      .string({ message: "Brand name is required" })
      .min(2, { message: "Brand name must be at least 2 characters long" })
      .max(30, {
        message: "Brand name must be at most 30 characters long",
      }),
    status: z.enum(BRAND_STATUS),
    image: z.object({ url: z.string(), publicId: z.string() }).optional(),
    slug: z.string().readonly(),
  });

export const createBrandZod = brandZod
  .omit({ slug: true, image: true })
  .extend({ image: z.any().optional() });

export const updateBrandZod = brandZod
  .pick({ name: true, status: true })
  .extend({ image: z.any().optional() });

export type CreateBrand = z.infer<typeof createBrandZod>;
export type UpdateBrand = z.infer<typeof updateBrandZod>;
