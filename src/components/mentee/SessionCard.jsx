// src/components/mentee/SessionCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaBriefcase, FaEnvelope, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

const SessionCard = ({ session, type }) => {
  const getStatusConfig = () => {
    switch (type) {
      case 'upcoming':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <FaHourglassHalf className="mr-2" />,
          gradient: 'from-blue-500/20 to-cyan-500/20'
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <FaCheckCircle className="mr-2" />,
          gradient: 'from-green-500/20 to-emerald-500/20'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <FaTimesCircle className="mr-2" />,
          gradient: 'from-red-500/20 to-rose-500/20'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <FaHourglassHalf className="mr-2" />,
          gradient: 'from-gray-500/20 to-slate-500/20'
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const statusConfig = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig.gradient} 
        rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`} />

      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl 
        transition-all duration-300 overflow-hidden">
        {/* Top Decorative Bar */}
        <div className="h-2 bg-gradient-to-r from-[#4540E1] to-[#3632B0]" />

        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className="flex items-center space-x-2 mb-2">
                <FaUser className="text-[#4540E1]" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {session.mentor.name}
                </h3>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <FaEnvelope className="text-gray-400" />
                <p>{session.mentor.email}</p>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <FaBriefcase className="text-gray-400" />
                <p>{session.mentor.currentPosition}</p>
              </div>
            </motion.div>

            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusConfig.color}`}
            >
              {statusConfig.icon}
              {session.status}
            </motion.span>
          </div>

          {/* Session Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-4 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-3 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-500 flex items-center mb-1">
                  <FaCalendarAlt className="mr-2 text-[#4540E1]" />
                  Day
                </p>
                <p className="font-medium text-gray-800">{session.day}</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-3 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-500 flex items-center mb-1">
                  <FaCalendarAlt className="mr-2 text-[#4540E1]" />
                  Date
                </p>
                <p className="font-medium text-gray-800">{formatDate(session.date)}</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-3 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-500 flex items-center mb-1">
                  <FaClock className="mr-2 text-[#4540E1]" />
                  Time Slot
                </p>
                <p className="font-medium text-gray-800">{session.timeSlot}</p>
              </motion.div>
            </div>

            {session.message && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-500 mb-2">Message</p>
                <p className="text-gray-700">{session.message}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SessionCard;