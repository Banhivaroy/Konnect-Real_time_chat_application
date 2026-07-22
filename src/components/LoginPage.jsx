import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import { m } from "framer-motion";
import LoginBackground from "./LoginBackground";
import { span } from "framer-motion/client";
import { Mail, Lock } from "lucide-react";
import "../LoginBackground.css"

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        const check = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
          credentials: "include",
        });

        console.log("Status:", check.status);
        console.log(await check.json());

        const from = location.state?.from?.pathname || "/chat";
        navigate(from, { replace: true });
      } else {
        setErrors({
          login: data.message,
        });
      }
    } catch (err) {
      console.error(err);
      setErrors({
        login: "unable to login",
      });
    }
  };
  return (
    <div className="login-page">
      <LoginBackground />
      <div className="login-card">
        <h1>Login</h1>
        <p className="sub"></p>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google Login Success");
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="field">
          <div className="label-row">
            <Mail size={18} />
            <label>Email</label>
          </div>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder="alex@email.com"
          />
          
        </div>

        <div className="field">
          <div className="label-row">
            <Lock size={18} />
            <label>Password</label>
          </div>

          <div className="field-wrap">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <span className="hide">Hide</span>
              ) : (
                <span className="show">Show</span>
              )}
            </button>
          </div>
        </div>

        <div className="options">
          <label className="remember">
            <input type="checkbox" />
            Remember me
          </label>

          <a href="/">Forgot Password?</a>
        </div>

        <button className="login-btn" onClick={handleLogIn}>
          Sign In
        </button>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
