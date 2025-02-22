import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MentorNavbar = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchMentorProfile = async () => {
      try {
        const mentorData = JSON.parse(localStorage.getItem("user"));
        if (!mentorData || !mentorData.id) return;
  
        const response = await axios.post(
          `${BASE_URL}/mentor/mentor-image-url`,
          { mentorId: mentorData.id }
        );

        if (response.data && response.data.success && response.data.imageUrl) {
          setProfilePicture(response.data.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching mentor profile:", error.response?.data || error.message);
      }
    };
  
    fetchMentorProfile();
  }, []);
  
  console.log(profilePicture);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white shadow-lg backdrop-blur-md bg-opacity-90' : 'bg-white'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/mentor/MentorView" 
            className="group flex items-center space-x-2"
          >
            <span className="text-[#4540E1] text-2xl font-bold transform transition-all duration-300 
              group-hover:scale-105 group-hover:text-[#3632B0]"
            >
              Mentorify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/mentor/availability" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-all duration-300
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 
                before:h-[2px] before:bg-[#4540E1] before:transition-all before:duration-300 
                hover:before:w-full font-medium"
            >
              Set Availability
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

            <Link 
              to="/contact-us" 
              className="nav-link relative text-gray-600 hover:text-[#4540E1] transition-all duration-300
                before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-0 
                before:h-[2px] before:bg-[#4540E1] before:transition-all before:duration-300 
                hover:before:w-full font-medium"
            >
              Contact us
            </Link>

            <Link 
              to="/mentor/profile"
              className="flex items-center space-x-2 group"
            >
              {profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#4540E1] 
                    transition-all duration-300 transform group-hover:scale-105 
                    group-hover:border-[#3632B0] shadow-md"
                />
              ) : (
                <div className="p-2 rounded-full bg-[#4540E1] text-white transition-all duration-300 
                  transform group-hover:scale-105 group-hover:bg-[#3632B0] shadow-md"
                >
                  <FaUserCircle className="text-2xl" />
                </div>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-[#4540E1] 
                transition-colors duration-300 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/mentor/availability" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 
                hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
            >
              Set Availability
            </Link>
            <Link 
              to="/about-us" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 
                hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
            >
              About Us
            </Link>
            <Link 
              to="/contact-us" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 
                hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
            >
              Contact us
            </Link>
            <Link 
              to="/mentor/profile" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 
                hover:text-[#4540E1] hover:bg-gray-50 transition-all duration-300"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MentorNavbar;
