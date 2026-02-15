import type { AxiosInstance } from "axios";
import { PATH_REFRESH_TOKEN, PATH_SIGNIN } from "@/lib/links/paths.routes";
import { storageUtils } from "@/lib/tokens";
import { authApi } from "@/core/services/auth.service";
import { cookiesService }from '@/lib/cookies'
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export function setupInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const originalRequest = error.config;

      if (!error.response) {
        return Promise.reject(error);
      }

      const isAuthRequest =
        originalRequest.url === PATH_SIGNIN ||
        originalRequest.url === PATH_REFRESH_TOKEN;

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        !isAuthRequest
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          console.log("🔄 Attempting to refresh token...");
          const res = await authApi.refresh();
          console.log("✅ Refresh response:", res.data);

          if (res.data.status === "success") {
            const newToken = res.data.data?.token;

            if (newToken) {
              console.log(
                "🔑 New token received, retrying request:",
                originalRequest.url,
              );
              storageUtils.setToken(newToken);
              axiosInstance.defaults.headers.common["Authorization"] =
                `Bearer ${newToken}`;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              processQueue(null, newToken);
              return axiosInstance(originalRequest);
            }
          }

          console.error("❌ Refresh failed: Invalid response status", res.data);
          throw new Error("Refresh failed");
        } catch (refreshError: any) {
          console.error("❌ Refresh token process error:", {
            status: refreshError?.response?.status,
            message: refreshError?.message,
            data: refreshError?.response?.data,
          });
          processQueue(refreshError, null);
          storageUtils.removeToken();
          storageUtils.removeUser();
          cookiesService.remove()

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
}

//   cookiesService.remove();
