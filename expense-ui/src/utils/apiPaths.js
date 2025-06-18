const isDev = import.meta.env.DEV;

export const REACT_BASE_URL = isDev
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL;

// utils/apiPaths.js

export const API_URLS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_DATA: "/api/v1/auth/getUser",
    LOGOUT: "/api/v1/auth/logout",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/addIncome",
    GET_ALL_INCOME: "/api/v1/income/getIncome",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/addExpense",
    GET_ALL_EXPENSE: "/api/v1/expense/getExpenses",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
