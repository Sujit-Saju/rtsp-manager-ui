import { AxiosError, InternalAxiosRequestConfig } from "axios";
import api from "./axios";

export const setupInterceptors = () => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(error)
  );
};