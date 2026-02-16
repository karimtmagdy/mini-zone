import type { CategoryDto } from "@/contract/category.dto";
import type { CreateCategory,UpdateCategory } from "@/schema/category.schema";
import { http } from "../interceptors/http";
import type { ApiResponse, ApiResponseWithPagination } from "@/contract/global.dto";
export const categoriesApi = { 

  list: async (params: { page?: number; limit?: number } = {}) => {
    try {
      const response = await http.get<ApiResponseWithPagination<CategoryDto[]>>("/categories", {
        params,
      });
      console.log("✅ Full Response:", response);
      console.log("✅ Response Data:", response.data);
      console.log("✅ Status:", response.status);
      console.log(response)
      return await response.data;
    } catch (error: any) {
      console.error("❌ API Error:", error);
      console.error("❌ Error Response:", error.response?.data);
      console.error("❌ Error Status:", error.response?.status);
      throw error;
    }
  },

  create: async (payload: CreateCategory) => {
    const response = await http.post<ApiResponse<CategoryDto>>(
      "/admin/categories",
      payload,
    );
    return response;
  },

  update: async (id: string, payload: UpdateCategory) => {
    const response = await http.patch<ApiResponse<CategoryDto>>(
      `/admin/categories/${id}`,
      payload,
    );
    return response;
  },
  getId: async (id: string) => {
    const response = await http.get(`admin/categories/${id}`);
    return response;
  },
  remove: async (id: string) => {
    await http.delete(`/admin/categories/${id}`);
  },
  bulkDelete: async (ids: string[]) => {
    await http.delete(`/admin/categories/bulk`, { data: { ids } });
  },
};
