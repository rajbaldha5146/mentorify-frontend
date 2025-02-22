import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import MenteeNavbar from '../components/common/MenteeNavbar';
import { FaUser, FaEnvelope, FaSignOutAlt, FaEdit } from 'react-icons/fa';

const MenteeProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <MenteeNavbar />

      {/* Decorative Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
        className="fixed top-0 left-0 w-96 h-96 bg-[#4540E1] rounded-full filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed bottom-0 right-0 w-96 h-96 bg-[#3632B0] rounded-full filter blur-3xl"
      />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-xl bg-opacity-80"
          >
            {/* Profile Header */}
            <motion.div 
              className="flex items-center justify-center mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#4540E1] to-[#3632B0] 
                  rounded-full flex items-center justify-center">
                  <FaUser className="text-4xl text-white" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 
                    shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaEdit className="text-[#4540E1]" />
                </motion.button>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-center text-gray-800 mb-8"
            >
              Profile Details
            </motion.h1>

            {/* Profile Information */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-xl p-6 transition-all duration-300 
                  hover:shadow-md group"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <FaUser className="text-[#4540E1] group-hover:scale-110 
                    transition-transform duration-300" />
                  <p className="text-gray-600">Name</p>
                </div>
                <p className="text-xl font-semibold text-gray-800 pl-8">{user?.name}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-xl p-6 transition-all duration-300 
                  hover:shadow-md group"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <FaEnvelope className="text-[#4540E1] group-hover:scale-110 
                    transition-transform duration-300" />
                  <p className="text-gray-600">Email</p>
                </div>
                <p className="text-xl font-semibold text-gray-800 pl-8">{user?.email}</p>
              </motion.div>
            </div>

            {/* Logout Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white 
                  py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 
                  flex items-center justify-center space-x-2 group"
              >
                <FaSignOutAlt className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Logout</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Additional Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Need help? Contact support at{' '}
              <a 
                href="mailto:support@example.com"
                className="text-[#4540E1] hover:text-[#3632B0] transition-colors duration-300"
              >
                support@example.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MenteeProfile; 