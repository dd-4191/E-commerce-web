// src/components/LoginRegister.jsx
import React, { useState } from "react";

import "./Login.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginRegister = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    device_name: "browser",
    term: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login({
      email: form.email,
      password: form.password,
      device_name: form.device_name,
    });
    if (res.success) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error(res.message || "Login failed");
    }

    // navigate("/products/:id");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.term) {
      toast.warning("Please accept Terms & Conditions");
      return;
    }

    const res = await register(form);

    // Use toast
    if (res.success) {
      toast.success("Registered & logged in!");
      setIsLogin(true);
    } else {
      toast.error(res.message || "Registration failed");
    }
  };
  return (
    <div className="login-page">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <form className="form" onSubmit={handleLogin}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              name="device_name"
              type="text"
              placeholder="Device Name"
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleRegister}>
            <input
              name="first_name"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              name="last_name"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <label>
              <input name="term" type="checkbox" onChange={handleChange} />I
              agree to the Terms & Conditions
            </label>
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
