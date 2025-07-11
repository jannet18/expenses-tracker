import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
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
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        console.error(
          "Forbidden: You do not have permission to access this resource."
        );
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
