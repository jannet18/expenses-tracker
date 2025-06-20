import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const token = localStorage.getItem("token");
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token && !isAuthenticated) {
    <Navigate to="/login" replace />;
    return;
  }

  return children;
};

export default ProtectedRoute;
