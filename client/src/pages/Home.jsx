import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../animation/homeIdea.json";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import '../index.css'
export default function Home() {
  const navigate = useNavigate();
 const [hoverView, setHoverView] = useState(false);
  const [hoverSubmit, setHoverSubmit] = useState(false);
  const handleGoToForm = () => {
    navigate("/submit-idea");
  };

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 w-full max-w-6xl">
          {/* Text Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 text-center w-full  "
          style={{height:'100vh',  margin: '20px' ,display: 'flex', }}
          >
            
             {/* <div className="hide-on-small"
              style={{
                display: "flex",
                width: "35vw",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",

              }}
            >
              <Lottie animationData={animationData} loop={true} />
            </div>  */}
          <div style={{alignContent: "center",
                justifyContent: "center",
                alignItems: "center",}}>
              <div className="flex justify-center mb-4">
                <Lightbulb className="text-indigo-600" size={48} style={{color:'#073763'}}/>
              </div>
              <h1 className="text-4xl sm:text-4xl font-extrabold text-indigo-700 mb-2"
              style={{fontSize: '3rem', color: '#073763'}}>
                Welcome!
              </h1>
              <p className="text-gray-600 mb-6 text-sm sm:text-base"
                style={{lineHeight: '1.6', 
                  fontSize: '1.5rem',
                }}>
              💡 Have a brilliant idea? We'd love to hear it!
Your creativity could spark something amazing. Whether it's a product improvement, a fresh perspective, or a completely new concept—share it with us and help shape the future.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/my-ideas")}
                onMouseEnter={() => setHoverView(true)}
                onMouseLeave={() => setHoverView(false)}
                className=" hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300"
              style={{backgroundColor: hoverView ? '#0b5394' : '#073763',padding:'20px', margin:'5px' , cursor: 'pointer',transition: 'background-color 0.3s ease',}}>
                View Ideas
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleGoToForm}
                onMouseEnter={() => setHoverSubmit(true)}
                onMouseLeave={() => setHoverSubmit(false)}
                className=" text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300"
              style={{backgroundColor: hoverSubmit ? '#0b5394' : '#073763' ,padding:'20px', margin:'5px', cursor: 'pointer',transition: 'background-color 0.3s ease',}}>
                Submit Your Idea
              </motion.button>
            </div>
          </motion.div>

          {/* Animation */}
        </div>
      </div>
  
  );
}
