import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const MenteeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/mentee/MenteeView" 
            className="text-[#4540E1] text-2xl font-bold transform hover:scale-105 transition-transform duration-300 flex items-center"
          >
            Mentorify
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/mentee/mentor" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-colors duration-300 text-sm font-medium
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[2px] 
                before:bg-[#4540E1] before:transition-all before:duration-300 hover:before:w-full"
            >
              Mentor
            </Link>
            <Link 
              to="/mentee/menteeDashboard" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-colors duration-300 text-sm font-medium
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[2px] 
                before:bg-[#4540E1] before:transition-all before:duration-300 hover:before:w-full"
            >
              Dashboard
            </Link>
            <Link 
              to="/about-us" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-colors duration-300 text-sm font-medium
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[2px] 
                before:bg-[#4540E1] before:transition-all before:duration-300 hover:before:w-full"
            >
              About Us
            </Link>
            <Link 
              to="/contact-us" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-colors duration-300 text-sm font-medium
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[2px] 
                before:bg-[#4540E1] before:transition-all before:duration-300 hover:before:w-full"
            >
              Contact us
            </Link>
            <Link 
              to="/mentee/profile" 
              className="flex items-center space-x-2 bg-[#4540E1] hover:bg-[#3632B0] text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <FaUserCircle className="text-xl" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#4540E1] transition-colors duration-300"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/mentee/mentor" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
              >
                Mentor
              </Link>
              <Link 
                to="/mentee/menteeDashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link 
                to="/about-us" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
              >
                About Us
              </Link>
              <Link 
                to="/contact-us" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
              >
                Contact us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MenteeNavbar;