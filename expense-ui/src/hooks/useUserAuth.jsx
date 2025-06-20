import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_URLS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        setLoading(loading);
        const response = await axiosInstance.get(API_URLS.AUTH.GET_USER_DATA, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUserInfo();
    }
    return () => {
      isMounted = false;
    };
  }, []);
};
