import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
      <img
        src="/assets/logo.png"
        alt="E-mart Logo"
        className="h-24 w-auto mb-10 animate-pulse"
      />
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
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
