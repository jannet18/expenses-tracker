import React from "react";
// import { useAuth } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    clearUser();
    <Navigate to="/login" replace />;
    return;
  }
  return children;
};

export default ProtectedRoute;
