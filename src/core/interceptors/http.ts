import axios, { type InternalAxiosRequestConfig } from "axios";
import { authApi } from "../services/auth.service";
import { storageUtils } from "@/lib/tokens";
import { PATH_REFRESH_TOKEN, PATH_SIGNIN } from "@/lib/links/paths.routes";
import { cookiesService } from "@/lib/cookies";
export const http = axios.create({
  //   baseURL: import.meta.env.DEV
  //     ? import.meta.env.VITE_DEV_URL
  //     : import.meta.env.VITE_PROD_URL,
  baseURL: import.meta.env.VITE_PROD_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// http.interceptors.response.use(
//   (response) => response,
//  async (error) => {
//     if (error.response.status === 401) {
//       const refreshResponse = await authApi.refresh();
//       if (refreshResponse.status === "success") {
//         const { token } = refreshResponse.data;
//         localStorage.setItem("token", token);
//         http.defaults.headers.common.Authorization = `Bearer ${token}`;
//         return http(error.config);
//       }
//     }
//     return Promise.reject(error);
//   },
// );
http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const isAuthRequest =
      originalRequest.url === PATH_SIGNIN ||
      originalRequest.url === PATH_REFRESH_TOKEN;
    console.log("isAuthRequest", isAuthRequest);
    if (error.response.status === 401 && !isAuthRequest) {
      storageUtils.removeToken();
      storageUtils.removeUser();
      cookiesService.remove();
      return Promise.reject(error);
    }

    // if (
    //   error.response.status === 401 &&
    //   !originalRequest._retry &&
    //   !isAuthRequest
    // ) {
    //   originalRequest._retry = true;
    //   const refreshResponse = await authApi.refresh();
    //   if (refreshResponse.status === "success") {
    //     const { token } = refreshResponse.data;
    //     storageUtils.setToken(token);
    //     originalRequest.headers.Authorization = `Bearer ${token}`;
    //     // http.defaults.headers.common.Authorization = `Bearer ${token}`;
    //     return http(originalRequest);
    //   }
    //   storageUtils.removeToken();
    //   storageUtils.removeUser();
    //   cookiesService.remove();
    // }
    return Promise.reject(error);
  },
);
