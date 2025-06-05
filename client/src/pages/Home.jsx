import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../animation/homeIdea.json";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();
  const [hoverView, setHoverView] = useState(false);
  const [hoverSubmit, setHoverSubmit] = useState(false);

  const handleGoToForm = () => {
    navigate("/submit-idea");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4 sm:p-6">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 w-full max-w-6xl">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center w-full max-w-xl"
        >
          <div className="flex justify-center mb-4">
            <Lightbulb className="text-indigo-600" size={48} style={{ color: "#073763" }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#073763]">
            Welcome!
          </h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
            💡 Have a brilliant idea? We'd love to hear it! Your creativity could spark something amazing. Whether it's a product improvement, a fresh perspective, or a completely new concept — share it with us and help shape the future.
          </p>
          <div className="flex flex-col gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/my-ideas")}
              onMouseEnter={() => setHoverView(true)}
              onMouseLeave={() => setHoverView(false)}
              className="text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300"
              style={{
                backgroundColor: hoverView ? "#0b5394" : "#073763",
              }}
            >
              View Ideas
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleGoToForm}
              onMouseEnter={() => setHoverSubmit(true)}
              onMouseLeave={() => setHoverSubmit(false)}
              className="text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300"
              style={{
                backgroundColor: hoverSubmit ? "#0b5394" : "#073763",
              }}
            >
              Submit Your Idea
            </motion.button>
          </div>
        </motion.div>

        {/* Animation - Only shows on large screens */}
        <div className="hidden lg:flex w-full max-w-md">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
}
