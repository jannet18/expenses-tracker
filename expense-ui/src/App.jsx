import React, { useEffect } from "react";
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { useState } from "react";

function App() {
  useUserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // let REACT_APP_DEMO_MODE;
    // const isDemo = REACT_APP_DEMO_MODE === "true";
    const token = localStorage.getItem("token");
    if (!token) {
      axiosInstance
        .post(API_URLS.AUTH.LOGIN, {
          email: "demo@example.com",
          password: "demopassword",
        })
        .then((res) => {
          const { token, user } = res.data;
          if (token) {
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/dashboard", { replace: true });
          }
        })
        .catch((err) => {
          console.error("Demo login failed", err);
        })
        .finally(() => setLoading(false));
    }
  }, [navigate]);
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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, token]);
  return null;
};
