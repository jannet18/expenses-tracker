import React, { useEffect } from "react";
import "./index.css";
import { Routes, Route, Navigate, replace } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/dashboard/Home";
import Expense from "./pages/dashboard/Expense";
import Income from "./pages/dashboard/Income";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUserAuth } from "./hooks/useUserAuth";
import axiosInstance from "./utils/axiosInstance";
import { API_URLS } from "./utils/apiPaths";

function App() {
  useUserAuth();

  useEffect(() => {
    let REACT_APP_DEMO_MODE;
    const isDemo = REACT_APP_DEMO_MODE === "true";
    if (isDemo && !localStorage.getItem("token")) {
      axiosInstance
        .post(API_URLS.AUTH.LOGIN, {
          email: "demo@example.com",
          password: "demopassword",
        })
        .then(() => {
          const { token, user } = res.data;
          if (token) {
            localStorage.setItem("token", token);
            updateUser(user);
            Navigate("/dashboard", { replace: true });
          }
        });
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense"
          element={
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </>
  );
}

export default App;

const Root = () => {
  return <Navigate to="/" />;
};
