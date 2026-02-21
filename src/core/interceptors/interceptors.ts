import type { AxiosInstance } from "axios";
import { PATH_AUTH } from "@/lib/links";
import { storageUtils } from "@/lib/tokens";
import { authApi } from "@/core/api/auth.api";
import { cookiesService } from "@/lib/cookies";
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
        originalRequest.url === PATH_AUTH.SIGNIN ||
        originalRequest.url === PATH_AUTH.REFRESH_TOKEN;

      // ✅ If the refresh token request fails with 401, the session is dead
      if (error.response.status === 401 && originalRequest.url === PATH_AUTH.REFRESH_TOKEN) {
        console.error("🛑 Session expired. Clearing everything...");
        storageUtils.removeToken();
        storageUtils.removeUser();
        cookiesService.remove();
        
        // Redirect if we are in the browser
        if (typeof window !== "undefined") {
          window.location.href = PATH_AUTH.SIGNIN;
        }
        return Promise.reject(error);
      }

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
          
          if (res.data.status === "success") {
            const newToken = res.data.data?.token;

            if (newToken) {
              console.log("✅ Token refreshed successfully.");
              storageUtils.setToken(newToken);
              axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              processQueue(null, newToken);
              return axiosInstance(originalRequest);
            }
          }

          throw new Error("Refresh failed");
        } catch (refreshError: any) {
          processQueue(refreshError, null);
          storageUtils.removeToken();
          storageUtils.removeUser();
          cookiesService.remove();

          if (typeof window !== "undefined") {
            window.location.href = PATH_AUTH.SIGNIN;
          }

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
