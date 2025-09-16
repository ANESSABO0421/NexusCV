import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

// request interceptors
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.Autorization = `Bearer ${accessToken}`;
  }
  (error) => {
    return Promise.reject(error);
  };
});

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error("Server error");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("request timeout");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
