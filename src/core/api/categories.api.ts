import type { CategoryDto } from "@/contract/category.dto";
import type { CreateCategory, UpdateCategory } from "@/schema/category.schema";
import { http } from "../interceptors/http";
import type { ResponseZod, ResponseWithMeta } from "@/contract/global.dto";
export const categoriesApi = {
  list: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
      sort?: string;
    } = {},
  ) => {
    const response = await http.get<ResponseWithMeta<CategoryDto[]>>(
      `/categories`,
      {
        params,
      },
    );
    console.log("✅ Full Response:", response);
    return response.data;
  },


  create: async (payload: CreateCategory) => {
    const response = await http.post<ResponseZod<CategoryDto>>(
      "/admin/categories",
      payload,
    );
    return response.data;
  },

  update: async (id: string, payload: UpdateCategory) => {
    const response = await http.patch<ResponseZod<CategoryDto>>(
      `/admin/categories/${id}`,
      payload,
    );
    return response.data;
  },
  getId: async (id: string) => {
    const response = await http.get(`admin/categories/${id}`);
    return response.data;
  },
  remove: async (id: string) => {
    const response = await http.delete<ResponseZod<CategoryDto>>(`/admin/categories/${id}`);
    return response.data;
  },

  bulkDelete: async (ids: string[]) => {
    await http.delete(`/admin/categories/bulk`, { data: { ids } });
  },
};
