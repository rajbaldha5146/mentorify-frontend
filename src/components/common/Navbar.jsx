import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 
      ${isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center space-x-2"
          >
            <span className="text-[#4540E1] text-2xl font-bold transform transition-all duration-300 
              group-hover:scale-105 group-hover:text-[#3632B0]"
            >
              Mentorify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/signup" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-all duration-300
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 
                before:h-[2px] before:bg-[#4540E1] before:transition-all before:duration-300 
                hover:before:w-full font-medium"
            >
              Mentor
            </Link>
            <Link 
              to="/about-us" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-all duration-300
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 
                before:h-[2px] before:bg-[#4540E1] before:transition-all before:duration-300 
                hover:before:w-full font-medium"
            >
              About Us
            </Link>
            {/* <Link 
              to="/contact-us" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-all duration-300
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 
                before:h-[2px] before:bg-[#4540E1] before:transition-all before:duration-300 
                hover:before:w-full font-medium"
            >
              Contact us
            </Link> */}
            <Link 
              to="/login" 
              className="text-[#4540E1] font-medium hover:text-[#3632B0] transition-all duration-300"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="bg-[#4540E1] text-white px-6 py-2.5 rounded-full font-medium
                transition-all duration-300 transform hover:scale-105 hover:bg-[#3632B0]
                hover:shadow-lg hover:shadow-[#4540E1]/20 active:scale-95"
            >
              SIGN UP
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-[#4540E1] 
              hover:bg-gray-100 transition-colors duration-300"
          >
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-lg text-gray-600 font-medium
                    hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
                >
                  Mentor
                </Link>
                <Link 
                  to="/about-us" 
                  className="block px-3 py-2 rounded-lg text-gray-600 font-medium
                    hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
                >
                  About Us
                </Link>
                {/* <Link 
                  to="/contact-us" 
                  className="block px-3 py-2 rounded-lg text-gray-600 font-medium
                    hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
                >
                  Contact us
                </Link> */}
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-lg text-[#4540E1] font-medium
                    hover:bg-[#4540E1]/10 transition-all duration-300"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-lg bg-[#4540E1] text-white font-medium
                    hover:bg-[#3632B0] transition-all duration-300 text-center"
                >
                  SIGN UP
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;