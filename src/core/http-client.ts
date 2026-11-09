import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"

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
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
export const apiClient = {
  query: <T, P extends object = Record<string, unknown>>(
    endpoint: string,
    params?: P,
    options?: AxiosRequestConfig
  ) => httpClient.get<T>(`${endpoint}`, { params, ...options }),
  mutation: <T = any>(
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

// AuthInterceptors(http);
// SetupInterceptors(http);
// RefreshInterceptors(http);
