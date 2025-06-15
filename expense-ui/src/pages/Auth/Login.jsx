import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import { useAuth } from "../../contexts/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_URLS } from "../../utils/apiPaths";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the correct password");
      return;
    }
    setError("");

    // Login api
    // try {
    //   await login({ email, password });
    //   navigate("/dashboard");
    //   // window.location.href = "/dashboard";
    // } catch (error) {
    //   const message =
    //     error?.response?.data?.message || error?.message || "Login failed!";
    //   setError(message);
    // }
    try {
      const response = await axiosInstance.post(API_URLS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response?.data;
      // console.log("login", response.data);
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      } else {
        console.warn("No token returned from backend");
        setError("Signup failed. No token received.");
      }
    } catch (error) {
      if (error?.response && error?.response?.data.message) {
        const message =
          error?.response?.data?.message || error?.message || "Login failed!";
        setError(message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome, Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="janedoe@gmail.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="password"
            placeholder="Min 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
