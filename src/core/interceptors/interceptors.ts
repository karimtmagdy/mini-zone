import { http } from "./http";
import type { InternalAxiosRequestConfig } from "axios";
import { PATH_REFRESH_TOKEN, PATH_SIGNIN } from "@/lib/links/paths.routes";
import { storageUtils } from "@/lib/tokens";
import { authApi } from "@/core/services/auth.service";

export function setupInterceptors() {
  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };
      const isAuthRequest =
        originalRequest.url === PATH_SIGNIN ||
        originalRequest.url === PATH_REFRESH_TOKEN;

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        !isAuthRequest
      ) {
        originalRequest._retry = true;
        try {
          const res = await authApi.refresh();
          console.log("✅ Refresh Response:", res);
          if (res.data.status === "success") {
            const newToken = res?.data?.data?.token;

            if (newToken) {
              // Update the token in localStorage
              storageUtils.setToken(newToken);

              // Update headers for current retry and future requests
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              http.defaults.headers.common["Authorization"] =
                `Bearer ${newToken}`;
            }

            return http(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails, sign out the user
          storageUtils.removeToken();
          storageUtils.removeUser();
          window.location.href = PATH_SIGNIN;

          return Promise.reject(refreshError);
        }
      }
    },
  );
}

//   console.log("isAuthRequest", isAuthRequest);
//   cookiesService.remove();
