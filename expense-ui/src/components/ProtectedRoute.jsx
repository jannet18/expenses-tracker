import React from "react";
// import { useAuth } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  // const { user, updateUser } = useAuth();
  const token = localStorage.getItem("token");

  if (!token) {
    // clearUser();
    <Navigate to="/login" replace />;
    return;
  }
  // if (token) {
  //   updateUser(user);
  //   <Navigate to="/dashboard" />;
  //   return;
  // }
  return children;
};

export default ProtectedRoute;
