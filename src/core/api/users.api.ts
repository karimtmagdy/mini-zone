import type { UserDto } from "@/contract/user.dto";
import type { CreateUser, UpdateUser } from "@/schema/user.schema";
import { http } from "../interceptors/http";
import type { ResponseZod, ResponseWithMeta } from "@/contract/global.dto";
export const usersApi = {
  list: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
      sort?: string;
    } = {},
  ) => {
    const response = await http.get<ResponseWithMeta<UserDto[]>>(
      "/admin/users",
      {
        params,
      },
    );

    return response.data;
  },

  create: async (payload: CreateUser) => {
    const response = await http.post<ResponseZod<UserDto>>(
      "/admin/users",
      payload,
    );
    return response.data;
  },

  update: async (id: string, payload: UpdateUser) => {
    const response = await http.patch<ResponseZod<UserDto>>(
      `/admin/users/${id}`,
      payload,
    );
    return response.data;
  },
  getId: async (id: string) => {
    const response = await http.get(`admin/users/${id}`);
    return response.data;
  },
  remove: async (id: string) => {
    const response = await http.delete<ResponseZod<UserDto>>(`/admin/users/${id}`);
    return response.data;
  },

  bulkDelete: async (ids: string[]) => {
    await http.delete(`/admin/users/bulk`, { data: { ids } });
  },
};
