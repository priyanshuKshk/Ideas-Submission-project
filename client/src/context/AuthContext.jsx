// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setUser(userData ? JSON.parse(userData) : null);
    }
  }, []);
  const login = (userData, token, image) => {
  setIsLoggedIn(true);
  setProfileImage(image);
    setToken(token);
  const updatedUser = {
    ...userData,
  isAdmin: userData.isAdmin
 // Fallback to role if isAdmin missing
  };

  setUser(updatedUser);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(updatedUser));
};


  const logout = () => {
    setIsLoggedIn(false);
    setProfileImage("");
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, profileImage, user,token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
