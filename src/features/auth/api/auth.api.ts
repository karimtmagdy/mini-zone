import { apiClient } from "@/core/http-client"
import { API } from "@/core/endpoints"
import type { ApiResponse } from "@/types/types"
import type { UserEntity } from "@/features/auth/model/auth.entity"
import type {
  IAuthApi,
  IAuthResult,
  ILoginPayload,
  IRegisterPayload,
  IRegisterResult,
} from "@/features/auth/model/auth.port"

/** `user` object as returned by the backend auth endpoints. */
interface UserDoc {
  id: string
  username: string
  email: string
  status?: UserEntity["status"]
  createdAt?: string
}

/** Body of `data` returned by login / refresh. */
interface AuthDoc {
  token: string
  user: UserDoc
}

export class AuthApi implements IAuthApi {
  async login(payload: ILoginPayload): Promise<IAuthResult> {
    const res = await apiClient.mutation<ApiResponse<AuthDoc>>(
      "post",
      API.auth.login,
      payload
    )
    return res.data.data
  }

  async register(payload: IRegisterPayload): Promise<IRegisterResult> {
    const res = await apiClient.mutation<
      ApiResponse<{ user: IRegisterResult }>
    >("post", API.auth.register, payload)
    return res.data.data.user
  }

  async me(): Promise<UserEntity> {
    const res = await apiClient.query<ApiResponse<{ user: UserDoc }>>(
      API.auth.me
    )
    return res.data.data.user
  }

  async refresh(): Promise<IAuthResult> {
    const res = await apiClient.mutation<ApiResponse<AuthDoc>>(
      "post",
      API.auth.refresh
    )
    return res.data.data
  }

  async logout(): Promise<void> {
    await apiClient.mutation<ApiResponse<null>>("post", API.auth.logout)
  }
}

export const authApi = new AuthApi()
