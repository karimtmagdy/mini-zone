import type { At } from "./global.dto";

export const SUBCATEGORY_STATUS = ["active", "inactive", "archived"] as const;
export type SubCategoryStatus = (typeof SUBCATEGORY_STATUS)[number];

export enum SubCategoryStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

export type SubCategoryDto = At & {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: {
    id: string;
    name: string;
  }[];
  products: number;
  status: SubCategoryStatus;
};
