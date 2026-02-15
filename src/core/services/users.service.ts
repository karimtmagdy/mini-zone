import type { UserDto } from "@/contract/user.dto";
import type { CreateUser, UpdateUser } from "@/schema/user.schema";
import { http } from "../interceptors/http";
import type { ApiResponse, ApiResponseWithPagination } from "@/contract/global.dto";
export const usersApi = { 

  list: async (params: { page?: number; limit?: number } = {}) => {
    try {
      const response = await http.get<ApiResponseWithPagination<UserDto[]>>("/admin/users", {
        params,
      });
      console.log("✅ Full Response:", response);
      console.log("✅ Response Data:", response.data);
      console.log("✅ Status:", response.status);
      return response.data;
    } catch (error: any) {
      console.error("❌ API Error:", error);
      console.error("❌ Error Response:", error.response?.data);
      console.error("❌ Error Status:", error.response?.status);
      throw error;
    }
  },

  create: async (payload: CreateUser) => {
    const response = await http.post<ApiResponse<UserDto>>(
      "/admin/users",
      payload,
    );
    return response;
  },

  update: async (id: string, payload: UpdateUser) => {
    const response = await http.patch<ApiResponse<UserDto>>(
      `/admin/users/${id}`,
      payload,
    );
    return response;
  },
  getId: async (id: string) => {
    const response = await http.get(`admin/users/${id}`);
    return response;
  },
  remove: async (id: string) => {
    await http.delete(`/admin/users/${id}`);
  },
  bulkDelete: async (ids: string[]) => {
    await http.delete(`/admin/users/bulk`, { data: { ids } });
  },
};
