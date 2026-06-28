import React, { useState } from "react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <span className="brand-name">Konnect</span>
        </div>

        <h1>Welcome Back</h1>
        <p className="sub"></p>

        <button className="google-btn">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Continue with Google
        </button>

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

        <button className="login-btn">Sign In</button>

        <p className="signup-link">
          Don't have an account? <a href="/">Create one</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
