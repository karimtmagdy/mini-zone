import { apiClient } from "@/core/http-client"
import { API } from "@/core/endpoints"
import type { ApiResponse, PaginationResponse } from "@/types/types"
import type {
  BrandEntity,
  BrandStatus,
  ICreateBrandPayload,
  IUpdateBrandPayload,
} from "@/features/brand/model/brand.entity"

export interface IListBrandsParams {
  page?: number
  limit?: number
  search?: string
}

/** Brand transport service (plain functions, no class instance). */
export const brandService = {
  async list(
    params?: IListBrandsParams
  ): Promise<{ list: BrandEntity[]; total: number; pages: number }> {
    const res = await apiClient.query<PaginationResponse<BrandEntity>>(
      API.brands.base,
      params as Record<string, unknown> | undefined
    )
    return {
      list: res.data.data,
      total: res.data.meta.total,
      pages: res.data.meta.pages,
    }
  },

  async create(payload: ICreateBrandPayload): Promise<BrandEntity> {
    const res = await apiClient.mutation<ApiResponse<BrandEntity>>(
      "post",
      API.brands.base,
      payload
    )
    return res.data.data
  },

  async update(id: string, payload: IUpdateBrandPayload): Promise<BrandEntity> {
    const res = await apiClient.mutation<ApiResponse<BrandEntity>>(
      "patch",
      API.brands.one(id),
      payload
    )
    return res.data.data
  },

  async remove(id: string): Promise<BrandEntity> {
    const res = await apiClient.mutation<ApiResponse<BrandEntity>>(
      "delete",
      API.brands.one(id)
    )
    return res.data.data
  },

  async archive(id: string): Promise<BrandEntity> {
    const res = await apiClient.mutation<ApiResponse<BrandEntity>>(
      "patch",
      API.brands.archive(id)
    )
    return res.data.data
  },

  async restore(id: string): Promise<BrandEntity> {
    const res = await apiClient.mutation<ApiResponse<BrandEntity>>(
      "patch",
      API.brands.restore(id)
    )
    return res.data.data
  },

  async updateStatus(id: string, status: BrandStatus): Promise<BrandEntity> {
    const res = await apiClient.mutation<ApiResponse<BrandEntity>>(
      "patch",
      API.brands.status(id),
      { status }
    )
    return res.data.data
  },
}
