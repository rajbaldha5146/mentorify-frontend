import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MentorNavbar from '../components/common/MentorNavbar';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { FaCalendarCheck, FaUserGraduate, FaCheckCircle, FaTimesCircle, FaSpinner, FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const MentorView = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState({
    pending: [],
    upcoming: [],
    completed: [],
    cancelled: []
  });
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in or not a mentor
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role !== 'mentor') {
    return <Navigate to="/" />;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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

      <MentorNavbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-8 relative z-10"
      >
        {/* Welcome Section */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 backdrop-blur-xl 
            bg-opacity-80 transform hover:scale-[1.02] transition-all duration-300"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600">
            Manage your mentoring sessions and help shape the future of aspiring professionals.
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <FaSpinner className="animate-spin text-4xl text-[#4540E1]" />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pending Sessions */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-xl 
                bg-opacity-80 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaUserGraduate className="text-2xl text-[#4540E1]" />
                <h2 className="text-2xl font-bold text-gray-800">Pending Requests</h2>
              </div>
              <AnimatePresence>
                {sessions.pending.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-4 mb-4 hover:shadow-md 
                      transition-all duration-300"
                  >
                    {/* Session details */}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Upcoming Sessions */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-xl 
                bg-opacity-80 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaCalendarCheck className="text-2xl text-green-500" />
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Sessions</h2>
              </div>
              <AnimatePresence>
                {sessions.upcoming.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-4 mb-4 hover:shadow-md 
                      transition-all duration-300"
                  >
                    {/* Session details */}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Completed Sessions */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-xl 
                bg-opacity-80 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaCheckCircle className="text-2xl text-[#4540E1]" />
                <h2 className="text-2xl font-bold text-gray-800">Completed Sessions</h2>
              </div>
              <AnimatePresence>
                {sessions.completed.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-4 mb-4 hover:shadow-md 
                      transition-all duration-300"
                  >
                    {/* Session details */}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Cancelled Sessions */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-xl 
                bg-opacity-80 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaTimesCircle className="text-2xl text-red-500" />
                <h2 className="text-2xl font-bold text-gray-800">Cancelled Sessions</h2>
              </div>
              <AnimatePresence>
                {sessions.cancelled.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-4 mb-4 hover:shadow-md 
                      transition-all duration-300"
                  >
                    {/* Session details */}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MentorView; 