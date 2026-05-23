import axios from "axios";

import { readCookie } from "./helpers/cookie";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = readCookie("emilistToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    throw new Error(err);
  },
);
