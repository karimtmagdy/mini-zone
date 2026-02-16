import type { At, Image } from "./global.dto";

export const CATEGORY_STATUS = ["active", "inactive", "archived"];
export type CategoryStatus = (typeof CATEGORY_STATUS)[number];
export type CategoryDto = At & {
  id: string;
  name: string;
  slug: string;
  image: Image;
  status: CategoryStatus;
  productsCount: number;
};
