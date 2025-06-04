import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X ,User} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Lottie from 'lottie-react';
import animationData from '../animation/idea.json';
export default function Header() {
  const { isLoggedIn, user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();



  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
         {/* <div className="flex items-center space-x-2">
    <img src={logo} alt="Logo" className="h-10 w-auto" />
    <h1 className="text-xl font-bold">Your Site Name</h1> 
  </div>*/}
        <Link to="/home" className="text-xl font-bold text-blue-600" style={{ display: 'flex', alignItems: 'center',color: '#073763', fontSize: '1.5rem',  }}>
          IMAGINE
           <div style={{ width: 50, height: 50 , display: 'flex', marginLeft: 10}}>
      <Lottie animationData={animationData} loop={true} />
    </div>
        </Link>

        {/* Desktop Menu */}
        <nav className=" md:flex space-x-6 text-gray-700 font-medium"
        style={{ display: 'flex'  , flexDirection: 'row', alignItems: 'center' }}>
        
         {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          ) : (
          <>
              {user && (
                <div className="flex items-center gap-2">
                  <User className="text-indigo-600 w-4 h-4" />
                  <span>{user.firstName} {user.lastName}</span>
                </div>
              )}
              <button onClick={handleLogout} className="text-red-600 font-semibold">Logout</button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
  
      </div>

      
    </header>
  );
}
