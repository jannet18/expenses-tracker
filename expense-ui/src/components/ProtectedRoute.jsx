import React from "react";
import { useAuth } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // const token = localStorage.getItem("token");
  {
    user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
