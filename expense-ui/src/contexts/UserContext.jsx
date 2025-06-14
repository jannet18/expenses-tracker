import { createContext, useContext, useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_URLS } from "../utils/apiPaths";
// import uploadImage from "../utils/uploadImage";
// import { useNavigate } from "react-router-dom";

const UserContext = createContext();
export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUser = async () => {
//     try {
//       const response = await axiosInstance.get(API_URLS.AUTH.GET_USER_DATA, {
//         withCredentials: true,
//       });
//       if (response?.data) {
//         setUser(response?.data);
//       }
//     } catch (error) {
//       setUser(false);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const login = async ({ email, password }) => {
//     const response = await axiosInstance?.post(
//       API_URLS.AUTH.LOGIN,
//       { email, password },
//       { withCredentials: true }
//     );
//     if (response?.data) {
//       setUser(response?.data);
//       setLoading(false);
//     }
//   };

//   const register = async ({ fullName, email, password, profilePic }) => {
//     setLoading(true);

//     let profileImageUrl = "";

//     if (profilePic) {
//       const { imageUrl } = await uploadImage(profilePic);
//       profileImageUrl = imageUrl;
//     }

//     try {
//       const response = await axiosInstance.post(
//         API_URLS.AUTH.REGISTER,
//         {
//           fullName,
//           email,
//           password,
//           profileImageUrl,
//         },
//         { withCredentials: true }
//       );

//       if (response?.data) {
//         await fetchUser();
//       }
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     await axiosInstance.post(API_URLS.AUTH.LOGOUT);
//     setUser(null);
//   };

//   const value = {
//     user,
//     login,
//     register,
//     logout,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
