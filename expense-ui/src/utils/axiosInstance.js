import axios from "axios";
import { REACT_BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: REACT_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// // Request Interceptor
axiosInstance.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized. Redirecting to login...");
      } else if (error.response.status === 500) {
        console.error("Server Error. Please try again.");
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
