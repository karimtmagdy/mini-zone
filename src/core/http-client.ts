import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios"

import { API } from "@/core/endpoints"
import { PATHS } from "@/lib/router/basic.routes"
import type { ApiResponse } from "@/types/types"
import type { UserEntity } from "@/features/auth/model/auth.entity"
import { authSession } from "@/features/auth/api/auth.session"

export const httpClient = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_PROD_URL,

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}) as AxiosInstance

httpClient.interceptors.request.use((config) => {
  const token = authSession.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/** Routes that must never trigger a silent refresh (prevents loops). */
const PUBLIC_AUTH_ROUTES: string[] = [
  API.auth.login,
  API.auth.register,
  API.auth.refresh,
]

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean }

/** Single-flight refresh so concurrent 401s share one refresh call. */
let refreshPromise: Promise<string> | null = null

function refreshAccessToken(): Promise<string> {
  refreshPromise ??= httpClient
    .post<ApiResponse<{ token: string; user: UserEntity }>>(API.auth.refresh)
    .then((res) => {
      const result = res.data.data
      authSession.replace(result)
      return result.token
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetriableRequest | undefined
    const url = request?.url ?? ""
    const isPublic = PUBLIC_AUTH_ROUTES.some((route) => url.includes(route))

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retry ||
      isPublic
    ) {
      return Promise.reject(error)
    }

    request._retry = true

    try {
      const token = await refreshAccessToken()
      request.headers.Authorization = `Bearer ${token}`
      return httpClient(request)
    } catch {
      // Refresh failed: the session is no longer valid.
      authSession.clear()
      if (window.location.pathname !== PATHS.auth.login) {
        window.location.assign(PATHS.auth.login)
      }
      return Promise.reject(error)
    }
  }
)

export const apiClient = {
  query: <T, P extends object = Record<string, unknown>>(
    endpoint: string,
    params?: P,
    options?: AxiosRequestConfig
  ) => httpClient.get<T>(`${endpoint}`, { params, ...options }),
  mutation: <T = unknown>(
    method: "post" | "put" | "patch" | "delete",
    endpoint: string,
    data?: unknown,
    options?: AxiosRequestConfig
  ) => {
    if (method === "delete") {
      return httpClient.delete<T>(`${endpoint}`, { data, ...options })
    }
    return httpClient[method]<T>(`${endpoint}`, data, { ...options })
  },
}
