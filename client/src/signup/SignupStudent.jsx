import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import ReCAPTCHA from "react-google-recaptcha";

const SignupStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    } else if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    } else if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character.";
    } else {
      return "";
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length > 0) {
      const validationError = validatePassword(passwordValue);
      setPasswordError(validationError);
    } else {
      setPasswordError("");
    }

    if (rePassword.length > 0 && passwordValue !== rePassword) {
      setRePasswordError("Passwords do not match.");
    } else {
      setRePasswordError("");
    }
  };

  const handleRePasswordChange = (e) => {
    const rePasswordValue = e.target.value;
    setRePassword(rePasswordValue);

    if (rePasswordValue !== password) {
      setRePasswordError("Passwords do not match.");
    } else {
      setRePasswordError("");
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordError && !rePasswordError && captchaToken) {
      // Send verification email
      const response = await fetch("/api/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("A verification email has been sent to your email address.");
      } else {
        setMessage("Failed to send verification email. Please try again.");
      }
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form className="signupForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            data-tooltip-id="password-tooltip"
          />
          <Tooltip id="password-tooltip" place="right" effect="solid">
            Password must be at least 8 characters long, contain at least one
            number, and one special character.
          </Tooltip>
          {passwordError && <p className="error">{passwordError}</p>}
          <label htmlFor="re-password">Re-enter your Password:</label>
          <input
            type="password"
            id="re-password"
            autoComplete="off"
            placeholder="Re-enter your password"
            value={rePassword}
            onChange={handleRePasswordChange}
          />
          {rePasswordError && <p className="error">{rePasswordError}</p>}
          <ReCAPTCHA
            className="recaptcha"
            sitekey="6LfBdNgqAAAAAO3zfiqAyKmkP4MWytgXIAD8Ivd-"
            onChange={handleCaptchaChange}
          />
          <button
            type="submit"
            className="btn btn-success"
            disabled={passwordError || rePasswordError || !captchaToken}
          >
            Sign Up
          </button>
        </div>
        {message && <p className="message">{message}</p>}
        <div className="login">
          <p>Already have an account?</p>
          <Link to="/login/professional" className="btn btn-primary">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupStudent;
