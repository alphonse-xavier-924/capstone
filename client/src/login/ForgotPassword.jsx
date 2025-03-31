import React, { useState } from "react";
import "./forgotpassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("Email:", JSON.stringify({ email }));
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage(
          "If an account with this email exists, you will receive a password reset link shortly"
        );
      } else {
        console.log("Received email:", email);
        setMessage(
          "If an account with this email exists, you will receive a password reset link shortly"
        );
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setMessage("Failed to send password reset link. Please try again.");
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <form className="forgotPasswordForm" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-success">
            Send Reset Link
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
