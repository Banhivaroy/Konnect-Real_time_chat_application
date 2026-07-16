import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form,setform] = useState({
    email: "",
    password: ""
  })
  const [errors,setErrors] = useState({})

  const handleChange = (e) =>{
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleLogIn = async () => {
    try {
      const res = fetch(`${import.meta.env.VITE_BACKEND_URL}/login`,{
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      })

      const data =  await res.json()
      if(data.success){
        navigate("/chat")
      } else{
        setErrors({
          login: data.message
        })
      }

    }
    catch(err){
      console.error(err)
      setErrors({
        login: "unable to login"
      })
    }
  }
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <span className="brand-name">Konnect</span>
        </div>

        <h1>Welcome Back</h1>
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
          <label>Email</label>
          <input type="email" placeholder="alex@email.com" />
        </div>

        <div className="field">
          <label>Password</label>

          <div className="field-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
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

        <button className="login-btn" onClick={handleLogIn}>Sign In</button>

        <p className="signup-link">
          Don't have an account? <a href="/">Create one</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
