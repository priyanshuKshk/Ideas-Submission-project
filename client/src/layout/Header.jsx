import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/image.png";
import Lottie from "lottie-react";
import "../index.css";
import animationData from "../animation/idea.json";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
export default function Header() {
  const { isLoggedIn, user, token , logout } = useAuth();

  const [hover, setHover] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <img
              src={logo}
              alt="SMG-scholarships"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
              style={{
                maxWidth: "250px",
                maxHeight: "50px",
                padding: "4px",
                marginRight: "10px",
                marginBottom: "2px",
              }}
            />
          </Link>
          <Link
            to="/home"
            className=" font-bold playfair-display"
            id="myElement"
            style={{
              display: "flex",
              alignItems: "center",
              color: "#073763",
              fontSize: "1.8rem",
            }}
          >
            IMAGINE
            <div id="displayNone">
              {" "}
              <div
                style={{
                  width: 55,
                  height: 55,
                  display: "flex",
                  marginLeft: 20,
                }}
              >
                <Lottie animationData={animationData} loop={true} />
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav
          className=" md:flex space-x-6 text-gray-700 font-medium"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="flex items-center space-x-1"
                  onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: hover ? "#0b5394" : "#073763",
                        color: "white",
                        padding: "0.5rem 1rem", // py-2 px-4
                        borderRadius: "0.5rem", // rounded-lg
                        fontWeight: "400", // font-normal
                        transition: "background-color 0.2s",
                      }
                    : {
                        color: "#4B5563", // text-gray-700
                        fontWeight: "400",
                    
                      }
                }
              >
                <FiLogIn />
                <span
                  className="ml-1 "
                  style={{ paddingLeft: "5px" }}
                  id="myElement"
                  
                >
                  {" "}
                  Login
                </span>
              </NavLink>
              <NavLink
                to="/sign-up"
                className="flex items-center space-x-1"
                  onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
                  style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: hover ? "#0b5394" : "#073763",
                        color: "white",
                        padding: "0.5rem 1rem", // py-2 px-4
                        borderRadius: "0.5rem", // rounded-lg
                        fontWeight: "400", // font-normal
                        transition: "background-color 0.2s",
                      }
                    : {
                        color: "#4B5563", // text-gray-700
                        fontWeight: "400",
                        display: "flex",
                      }
                }
              >
                <FiUserPlus />
                <span
                  className="ml-1"
                  style={{ paddingLeft: "5px" }}
                  id="myElement"
                >
                  {" "}
                  Sign Up
                </span>
              </NavLink>
            </>
          ) : (
            <>
              {user && (
                <div className="flex items-center gap-2"
                
                >
                  <User className="text-indigo-600 w-4 h-4"
                id="myElement"/>
                  <span id="myElement">
                    {user.firstName}
                  </span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold"
                
              >
                Logout
              </button>
            </>
          )}

        </nav>

        {/* Mobile Menu Button */}
      </div>
    </header>
  );
}
