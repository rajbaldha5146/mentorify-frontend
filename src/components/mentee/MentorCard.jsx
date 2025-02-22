import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaGraduationCap, FaBriefcase, FaClock } from 'react-icons/fa';
import defaultAvatar from '../../assets/user.png'; // Add a default avatar image
import { useNavigate } from 'react-router-dom';

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <FaStar
          className={`${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          } text-xl transition-colors duration-300`}
        />
      </motion.div>
    ));
  };

  const handleBookSession = () => {
    navigate('/book-session', { state: { mentor } });
  };

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
      <div className="absolute inset-0 bg-gradient-to-br from-[#4540E1]/5 to-[#3632B0]/5 
        rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />

      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl 
        transition-all duration-300 overflow-hidden">
        {/* Top Decorative Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r 
          from-[#4540E1] to-[#3632B0] transform origin-left scale-x-0 
          group-hover:scale-x-100 transition-transform duration-500" />

        <div className="p-6">
          <div className="flex items-start space-x-4">
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 
                border-white shadow-lg">
                <img
                  src={mentor.profilePicture || defaultAvatar}
                  alt={mentor.name}
                  className="w-full h-full object-cover transform transition-transform 
                    duration-300 group-hover:scale-110"
                />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 bg-[#4540E1] text-white p-2 
                  rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaGraduationCap className="text-lg" />
              </motion.div>
            </motion.div>

            {/* Mentor Info */}
            <div className="flex-1">
              <motion.h3 
                className="text-xl font-semibold text-gray-800 group-hover:text-[#4540E1] 
                  transition-colors duration-300"
              >
                {mentor.name}
              </motion.h3>
              
              <div className="flex items-center space-x-2 mt-1">
                <FaBriefcase className="text-[#4540E1]" />
                <p className="text-[#4540E1] font-medium">{mentor.currentPosition}</p>
              </div>

              <div className="flex items-center space-x-2 mt-1">
                <FaClock className="text-gray-500" />
                <p className="text-gray-600 text-sm">{mentor.experience} experience</p>
              </div>

              {/* Rating */}
              <div className="flex items-center mt-3 space-x-1">
                <div className="flex">
                  {renderStars(mentor.rating.average)}
                </div>
                <span className="ml-2 text-gray-600 text-sm">
                  ({mentor.rating.totalReviews} reviews)
                </span>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {mentor.expertise?.slice(0, 3).map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm
                      hover:bg-[#4540E1]/10 hover:text-[#4540E1] transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Book Session Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookSession}
                className="mt-4 w-full bg-[#4540E1] text-white px-6 py-2.5 rounded-lg 
                  hover:bg-[#3632B0] transition-colors duration-300 shadow-lg 
                  hover:shadow-xl hover:shadow-[#4540E1]/20"
              >
                Book Session
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard; 