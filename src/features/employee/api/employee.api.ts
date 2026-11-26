import { apiClient } from "@/core/http-client"
import { API } from "@/core/endpoints"
import type { ApiResponse, PaginationResponse } from "@/types/types"
import type {
  EmployeeEntity,
  EmployeeStatus,
  IBootstrapAdminPayload,
  ICreateEmployeePayload,
  IHireEmployeePayload,
  IUpdateEmployeePayload,
} from "@/features/employee/model/employee.entity"

export interface IListEmployeesParams {
  page?: number
  limit?: number
  search?: string
}

/** Employee transport service (plain functions, no class instance). */
export const employeeService = {
  async list(
    params?: IListEmployeesParams
  ): Promise<{ list: EmployeeEntity[]; total: number; pages: number }> {
    const res = await apiClient.query<PaginationResponse<EmployeeEntity>>(
      API.employees.base,
      params as Record<string, unknown> | undefined
    )
    return {
      list: res.data.data,
      total: res.data.meta.total,
      pages: res.data.meta.pages,
    }
  },

  async bootstrap(payload: IBootstrapAdminPayload): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "post",
      API.employees.bootstrap,
      payload
    )
    return res.data.data
  },

  async create(payload: ICreateEmployeePayload): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "post",
      API.employees.base,
      payload
    )
    return res.data.data
  },

  async hire(payload: IHireEmployeePayload): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "post",
      API.employees.hire,
      payload
    )
    return res.data.data
  },

  async update(
    id: string,
    payload: IUpdateEmployeePayload
  ): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "patch",
      API.employees.one(id),
      payload
    )
    return res.data.data
  },

  async remove(id: string): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "delete",
      API.employees.one(id)
    )
    return res.data.data
  },

  async archive(id: string): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "patch",
      API.employees.archive(id)
    )
    return res.data.data
  },

  async restore(id: string): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "patch",
      API.employees.restore(id)
    )
    return res.data.data
  },

  async updateStatus(
    id: string,
    status: EmployeeStatus
  ): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "patch",
      API.employees.status(id),
      { status }
    )
    return res.data.data
  },
}
