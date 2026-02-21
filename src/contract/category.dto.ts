import type { At, Image } from "./global.dto";

export const CATEGORY_STATUS = ["active", "inactive", "archived"] as const;
export type CategoryStatus = (typeof CATEGORY_STATUS)[number];
export enum CategoryStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}
export type CategoryDto = At & {
  id: string;
  name: string;
  description: string;
  slug: string;
  image: Image;
  status: CategoryStatus;
  products: number;
};
