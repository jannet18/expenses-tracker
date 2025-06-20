import axios from "axios";
// import { REACT_BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
// axiosInstance.interceptors.request.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         console.warn("Unauthorized. Redirecting to login...");
//       } else if (error.response.status === 500) {
//         console.error("Server Error. Please try again.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // redirect to login
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server Error. Please try again later.");
      } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout. Please try again.");
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
