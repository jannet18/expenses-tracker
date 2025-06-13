import React from "react";
import { useAuth } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === null) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
