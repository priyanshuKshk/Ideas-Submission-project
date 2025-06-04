 import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {

  return (
    <footer className=" text-white  py-10 px-6" style={{backgroundColor:'#073763',}}> 
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold tracking-wide mb-3">SMG IMAGINE</h2>
          <p className="text-gray-200 leading-relaxed">
            SMG Imagine is a platform dedicated to fostering innovation and creativity. we provide a space for individuals to share their visions
          </p>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3 uppercase tracking-wide">Contact</h3>
          <ul className="space-y-2 text-gray-200">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-300" /> Office no: 370 Bal Mandir School, New Jagatpura,
              <br /> 
              Hoshiarpur (Punjab)
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-300" /> 1882318708
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-300" /> smgelectricscootersltd@gmail.com
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3 uppercase tracking-wide">Join us</h3>
          <p className="text-gray-200">Subscribe for updates & campaigns.</p>
          {/* Add newsletter form here if needed */}
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-blue-800 mt-10 pt-4 text-center text-gray-300 text-xs flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} <span className="font-semibold">SMG IMAGINE</span>. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}
