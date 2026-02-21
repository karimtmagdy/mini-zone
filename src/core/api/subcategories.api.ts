import type { SubCategoryDto } from "@/contract/subcategory.dto";
import type {
  CreateSubCategory,
  UpdateSubCategory,
} from "@/schema/subcategory.schema";
import { http } from "../interceptors/http";
import type { ResponseZod, ResponseWithMeta } from "@/contract/global.dto";
export const subCategoriesApi = {
  list: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
      sort?: string;
    } = {},
  ) => {
    const response = await http.get<ResponseWithMeta<SubCategoryDto[]>>(
      `/subcategories`,
      {
        params,
      },
    );
    console.log("✅ Full Response:", response);
    return response.data;
  },


  create: async (payload: CreateSubCategory) => {
    const response = await http.post<ResponseZod<SubCategoryDto>>(
      "/admin/subcategories",
      payload,
    );
    return response.data;
  },

  update: async (id: string, payload: UpdateSubCategory) => {
    const response = await http.patch<ResponseZod<SubCategoryDto>>(
      `/admin/subcategories/${id}`,
      payload,
    );
    return response.data;
  },
  getId: async (id: string) => {
    const response = await http.get(`admin/subcategories/${id}`);
    return response.data;
  },
  remove: async (id: string) => {
    const response = await http.delete<ResponseZod<SubCategoryDto>>(`/admin/subcategories/${id}`);
    return response.data;
  },

  bulkDelete: async (ids: string[]) => {
    await http.delete(`/admin/subcategories/bulk`, { data: { ids } });
  },
};
