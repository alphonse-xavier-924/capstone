import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const LoginStudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && email && password) {
      // Handle login logic here
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage("Login successful.");
      } else {
        setMessage(
          "Failed to login. Please check your credentials and try again."
        );
      }
    }
  };

  return (
    <div className="signup">
      <h2>Login</h2>
      <form className="signupForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error">{emailError}</p>}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className="btn btn-success"
            disabled={!email || !password || emailError}
          >
            Login
          </button>
        </div>
        {message && <p className="message">{message}</p>}
        <div className="login">
          <p>Don't have an account?</p>
          <Link to="/signup/professional" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginStudent;
