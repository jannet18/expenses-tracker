// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "../utils/axiosInstance"; // withCredentials: true

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // for auto-login check

//   // Load user on app mount (check cookie)
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/auth/me");
//         setUser(res.data);
//       } catch (err) {
//         setUser(null); // not logged in
//       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchUser();
// //   }, []);

// //   const login = async (credentials) => {
// //     const res = await axios.post("/auth/login", credentials);
// //     setUser(res.data.user);
// //   };

// //   const register = async (data) => {
// //     const res = await axios.post("/auth/register", data);
// //     setUser(res.data.user);
// //   };

// //   const logout = async () => {
// //     await axios.post("/auth/logout");
// //     setUser(null);
// //   };

// //   return (
// //     <UserContext.Provider value={{ user, setUser, login, register, logout, loading }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export const useUserAuth = () => useContext(UserContext);

// import React, { useContext } from "react";
// import { UserContext } from "../contexts/UserContext";

// const UseUserAuth = () => {
//   const { user, loading } = useContext(UserContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (loading) return;
//     if (!user && location.pathname !== "/login") navigate("/login");
//     if (user && location.pathname === "/login") navigate("/dashboard");
//   }, [user, loading, nav, loc.pathname]);

//   return <div>UseUserAuth</div>;
// };

// export default UseUserAuth;
