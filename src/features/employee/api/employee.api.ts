import { apiClient } from "@/core/http-client"
import { API } from "@/core/endpoints"
import type { ApiResponse, PaginationResponse } from "@/types/types"
import type {
  EmployeeEntity,
  IBootstrapAdminPayload,
  ICreateEmployeePayload,
  IHireEmployeePayload,
} from "@/features/employee/model/employee.entity"

export class EmployeeApi {
  async list(params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<{ list: EmployeeEntity[]; total: number; pages: number }> {
    const res = await apiClient.query<PaginationResponse<EmployeeEntity>>(
      API.employees.base,
      params
    )
    return {
      list: res.data.data,
      total: res.data.meta.total,
      pages: res.data.meta.pages,
    }
  }

  async bootstrap(payload: IBootstrapAdminPayload): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "post",
      API.employees.bootstrap,
      payload
    )
    return res.data.data
  }

  async create(payload: ICreateEmployeePayload): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "post",
      API.employees.base,
      payload
    )
    return res.data.data
  }

  async hire(payload: IHireEmployeePayload): Promise<EmployeeEntity> {
    const res = await apiClient.mutation<ApiResponse<EmployeeEntity>>(
      "post",
      API.employees.hire,
      payload
    )
    return res.data.data
  }
}

export const employeeApi = new EmployeeApi()
