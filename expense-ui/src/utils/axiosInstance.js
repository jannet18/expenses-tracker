import axios from "axios";
import { REACT_BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: REACT_BASE_URL,
  withCredentials: true,
  headers: {
    // "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  },
});

// Request Interceptor
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
