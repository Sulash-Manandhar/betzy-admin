import axios, { AxiosError, AxiosInstance } from "axios";
import { env } from "../env";
import { ClerkToken } from "@lib/types";

const headers = {
  "Content-Type": "application/json",
};
interface RequestParams {
  url: string;
  params?: unknown;
  data?: unknown;
  type?: "formData" | "json";
  token: ClerkToken;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.BACKEND_API,
  timeout: 30000,
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const get = async <T>({ url, params, token }: RequestParams) => {
  const config = token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;
  const response = await axiosInstance.get<T>(url, { params, ...config });
  return response.data;
};

const post = async <T>({ url, data, token }: RequestParams) => {
  const config = token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
};

const formdataPost = async <T>({ url, data, token }: RequestParams) => {
  const config = token
    ? {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
};

const put = async <T>({ url, data, token }: RequestParams) => {
  const config = token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;
  const response = await axiosInstance.put<T>(url, data, config);
  return response.data;
};

const patch = async <T>({ url, data, token }: RequestParams) => {
  const config = token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;
  const response = await axiosInstance.patch<T>(url, data, config);
  return response.data;
};

const del = async <T>({ url, token }: RequestParams) => {
  const config = token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;
  const response = await axiosInstance.delete<T>(url, config);
  return response.data;
};

export { del, get, patch, post, put, formdataPost };
