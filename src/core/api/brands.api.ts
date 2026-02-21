import type { BrandDto } from "@/contract/brand.dto";
import type { CreateBrand, UpdateBrand } from "@/schema/brand.schema";
import { http } from "../interceptors/http";
import type { ResponseWithMeta, ResponseZod } from "@/contract/global.dto";
export const brandsApi = {
  list: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
      sort?: string;
    } = {},
  ) => {
    const response = await http.get<ResponseWithMeta<BrandDto[]>>(`/brands`, {
      params,
    });
    return response.data;
  },

  create: async (payload: CreateBrand) => {
    const { image, ...rest } = payload;
    const hasImage = image instanceof File;

    if (hasImage) {
      const formData = new FormData();
      formData.append("image", image as File);
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      const response = await http.post<ResponseZod<BrandDto>>(
        "/admin/brands",
        formData
      );
      return response.data;
    }

    const response = await http.post<ResponseZod<BrandDto>>(
      "/admin/brands",
      rest
    );
    return response.data;
  },

  update: async (id: string, payload: UpdateBrand) => {
    const { image, ...rest } = payload;
    const hasImage = image instanceof File;

    if (hasImage) {
      const formData = new FormData();
      formData.append("image", image as File);
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      const response = await http.patch<ResponseZod<BrandDto>>(
        `/admin/brands/${id}`,
        formData
      );
      console.log(response.data);
      return response.data;
    }

    const response = await http.patch<ResponseZod<BrandDto>>(
      `/admin/brands/${id}`,
      rest
    );
    return response.data;
  },
  getId: async (id: string) => {
    const response = await http.get(`admin/brands/${id}`);
    return response;
  },
  remove: async (id: string) => {
    const response = await http.delete(`/admin/brands/${id}`);
    return response.data;
  },
  bulkDelete: async (ids: string[]) => {
    await http.delete(`/admin/brands/bulk`, { data: { ids } });
  },
};
