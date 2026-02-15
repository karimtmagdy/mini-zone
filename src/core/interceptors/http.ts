import axios from "axios";
import { storageUtils } from "@/lib/tokens";
import { setupInterceptors } from "./interceptors";
// import { cookiesService } from "@/lib/cookies";
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
  const token = storageUtils.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
setupInterceptors();
