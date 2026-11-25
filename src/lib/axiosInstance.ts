import axios from "axios";
import { handleExpiredSession } from "./helpers/handleExpiredSession";

import { getBrowserAuthMode, usesCookieSession } from "./helpers/authSession";
import { readCookie } from "./helpers/cookie";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Let the browser provide the multipart boundary, including when a default
    // JSON content type or an explicit multipart header was inherited.
    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      config.headers.delete("Content-Type");
    }
    const sessionAuth = usesCookieSession(getBrowserAuthMode());
    config.withCredentials = sessionAuth;
    const token = sessionAuth ? undefined : readCookie("emilistToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    else config.headers.delete("Authorization");
    return config;
  },
  (err) => {
    throw new Error(err);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) handleExpiredSession();
    return Promise.reject(error);
  },
);
