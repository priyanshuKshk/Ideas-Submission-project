import axios from 'axios';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
//import { useAuth } from '../context/AuthContext';
import { login } from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
   const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true); // ✅ Prevent the form's default action first
const API_URL = import.meta.env.VITE_API_URL;
  axios
    .post(
  `${API_URL}/login`
      , {
      email,
      password,
    })
    .then((result) => {
       const { message, token, user } = result.data;

      if (message === "Login successful") {
        alert("Login successful");
 localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
        // If using context
        login(user, token, user.profileImage || "");
 // Only call if login is defined

        // Navigate to home
        navigate("/");
      } else if (result.data === "Invalid password") {
        alert("Wrong password");
      } else if (result.data === "User not found") {
        alert("User not found, please sign up.");
        navigate("/signup");
      }
    })
  .catch((err) => {
  const errorMessage =
    err.response?.data?.error || err.response?.data?.message || "Login failed";
    setLoading(false);

  if (errorMessage === "User does not exist") {
    alert("User not found. Please sign up.");
    navigate("/sign-up"); // Optional: navigate to sign up
  } else if (errorMessage === "Invalid password") {
    alert("Wrong password. Please try again.");
  } else {
    alert(errorMessage);
  }
});
  }

  return (
    loading ? (
  <LoadingSpinner />
) : (
    <div className="tagesschrift-regular flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-900">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div style={{display: 'flex',gap:'10px ', alignItems: 'center'}}>
              <span className="px-3 text-gray-500">
                <FiMail />
              </span>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden"
            style={{width: '100%'}}>
            
              <input
                type="email"
                id="email"
                className="p-3 w-full outline-none"
                style={{padding: '10px', }}
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div style={{display: 'flex',gap:'10px ', alignItems: 'center'}}>
            <span className="px-3 text-gray-500">
                <FiLock />
              </span>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden"
            style={{width: '100%'}}>
              
              <input
                type="password"
                id="password"
                className="p-3 w-full outline-none flex-grow"
                style={{padding: '10px'}}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          </div>

        <div className="flex flex-col items-center mt-10">
      {!isLoggedIn ? (
        <motion.button
          onClick={handleLogin}
            onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
          className=" text-white px-4 py-2 rounded"
      style={{backgroundColor: hover ? '#0b5394' : '#073763'  , transition: 'background-color 0.3s ease',  cursor: 'pointer',borderRadius:'8px'}}  >
          Login
        </motion.button>
      ) : (
        <div className="flex items-center gap-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
          <p className="text-lg font-semibold">Welcome back!</p>
        </div>
      )}
    </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-blue-900 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>)
  );
};

export default Login;
