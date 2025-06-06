import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_URLS } from "../utils/apiPaths";

const UserContext = createContext();
export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(API_URLS.AUTH.GET_USER_DATA, {
        withCredentials: true,
      });
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      setError(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async ({ email, password }) => {
    const response = await axiosInstance?.post(
      API_URLS.AUTH.LOGIN,
      { email, password },
      { withCredentials: true }
    );
    if (response?.data) {
      setUser(response?.data);
    }
  };

  const register = async ({
    fullName,
    email,
    password,
    profilePic,
    profileImageUrl,
  }) => {
    setLoading(true);

    if (profilePic) {
      const imageUploadRes = await uploadImage(profilePic);
      profileImageUrl = imageUploadRes?.imageUrl || "";
    }
    const response = await axiosInstance?.post(
      API_URLS.AUTH.REGISTER,
      {
        fullName,
        email,
        password,
        profileImageUrl,
      },
      { withCredentials: true }
    );
    if (response.data) {
      setUser(response.data.user);
      setLoading(false);
    }
  };

  const logout = async () => {
    await axiosInstance.post(API_URLS.AUTH.LOGOUT);
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
