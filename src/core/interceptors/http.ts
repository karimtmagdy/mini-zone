import axios from "axios";
import { storageUtils } from "@/lib/tokens";
import { setupInterceptors } from "./interceptors";
import { PATH_REFRESH_TOKEN } from "@/lib/links/paths.routes";
// import { cookiesService } from "@/lib/cookies";
const prod = import.meta.env.VITE_PROD_URL;
export const http = axios.create({
  baseURL: prod,
  // baseURL: import.meta.env.MODE ? dev : prod,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Origin: dev ?? prod,
    // "Access-Control-Allow-Headers": "Content-Type",
  },
});
console.log(import.meta.env.MODE);

http.interceptors.request.use((config) => {
  const token = storageUtils.getToken();
  // Don't add Authorization header for the refresh token request itself
  const isRefreshTokenRequest = config.url === PATH_REFRESH_TOKEN;
  if (token && !isRefreshTokenRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Initialize interceptors AFTER the instance is created to avoid circular issues
setupInterceptors(http);
