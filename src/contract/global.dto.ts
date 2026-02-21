import { z } from "zod/v4";
import type {
  paginationZod,
  queryZod,
  responseWithMetaZod,
  responseZod,
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

export type QueryString = z.infer<typeof queryZod>;
export type Pagination = z.infer<typeof paginationZod>;
export type ResponseWithMeta<T> = Omit<
  z.infer<typeof responseWithMetaZod>,
  "data"
> & {
  data: T;
};
export type ResponseZod<T> = Omit<z.infer<typeof responseZod>, "data"> & {
  data: T;
};
export interface PropsWithId {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
// form: UseFormReturn<{ name: string;  image: File | null }>;
// type SortDirection = "asc" | "desc";
// type FormMode = "create" | "edit" | "delete";
// type FormModes = Record<FormMode, boolean>;
