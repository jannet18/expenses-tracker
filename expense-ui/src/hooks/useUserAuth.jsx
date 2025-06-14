import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_URLS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      clearUser();
      navigate("/login");
      return;
    }
    if (user) return;

    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_URLS.AUTH.GET_USER_DATA);
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser(user);
          navigate("/login");
        }
      }
    };
    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};
