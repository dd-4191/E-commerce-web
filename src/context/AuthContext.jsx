// src/context/AuthContext.js
import { createContext, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    // console.log(savedUser);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  //  Login function
  const login = async ({ email, password, device_name = "browser" }) => {
    try {
      const response = await axios.post(
        "https://hellostay.com/api/auth/login",
        {
          email,
          password,
          device_name,
        }
      );

      setToken(response.data.access_token);
      setUser(response.data.user);

      //  Store safely only if values are present
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Login failed.",
      };
    }
  };

  // Register + Auto Login function
  const register = async (userData) => {
    try {
      await axios.post("https://hellostay.com/api/auth/register", userData);

      // Call login after successful registration
      return await login({
        email: userData.email,
        password: userData.password,
        device_name: "browser",
      });
    } catch (error) {
      console.error("Register Error:", error);
      return { success: false, message: "Registration failed." };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
