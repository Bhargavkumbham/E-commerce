import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const validateEmail = (val) => {
    if (!val) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Invalid email address";
    return "";
  };
  const validatePassword = (val) => {
    if (!val) return "Password is required";
    if (val.length < 6) return "Password must be at least 6 characters";
    return "";
  };
  const validateName = (val) => {
    if (!val) return "Full Name is required";
    return "";
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    if (!isLogin) {
      const nameErr = validateName(name);
      setNameError(nameErr);
      if (nameErr) isValid = false;
    }
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    if (emailErr || passwordErr) isValid = false;
    if (!isValid) return;
    // Submit form here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
      <Link to="/">
        <img
          src="/assets/logo.png"
          alt="E-mart Logo"
          className="h-24 w-auto mb-10 animate-pulse"
        />
      </Link>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="mb-2 relative">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
              {nameError && (
                <div className="absolute left-0 top-full mt-1 w-full bg-red-50 border border-red-400 text-red-700 text-sm px-3 py-2 rounded shadow z-10">
                  {nameError}
                </div>
              )}
            </div>
          )}
          <div className="mb-2 relative">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none ${
                emailError ? "border-red-400" : ""
              }`}
              required
            />
            {emailError && (
              <div className="absolute left-0 top-full mt-1 w-full bg-red-50 border border-red-400 text-red-700 text-sm px-3 py-2 rounded shadow z-10">
                {emailError}
              </div>
            )}
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none ${
                passwordError ? "border-red-400" : ""
              }`}
              required
            />
            {passwordError && (
              <div className="absolute left-0 top-full mt-1 w-full bg-red-50 border border-red-400 text-red-700 text-sm px-3 py-2 rounded shadow z-10">
                {passwordError}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-900 transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-900 font-semibold hover:underline focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
