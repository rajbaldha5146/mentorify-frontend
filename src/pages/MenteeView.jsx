import React from 'react';
import { motion } from 'framer-motion';
import MenteeNavbar from '../components/common/MenteeNavbar';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import WhyBest from '../components/home/WhyBest';
import MentorshipProcess from '../components/home/MentorshipProcess';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaLightbulb } from 'react-icons/fa';

const MenteeView = () => {
  const { user } = useAuth();

  // Redirect if not logged in or not a mentee
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role !== 'mentee') {
    return <Navigate to="/" />;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
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

      {/* Navbar */}
      <motion.div
        variants={itemVariants}
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/80"
      >
        <MenteeNavbar />
      </motion.div>

      {/* Hero Section with Enhanced Animation */}
      <motion.div
        variants={itemVariants}
        className="relative z-10"
      >
        <Hero />
      </motion.div>

      {/* Stats Section with Hover Effects */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 py-12"
      >
        <div className="container mx-auto px-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-xl bg-opacity-80"
          >
            <Stats />
          </motion.div>
        </div>
      </motion.div>

      {/* Why Best Section with Interactive Cards */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 py-12 bg-gradient-to-b from-transparent to-white/50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-xl bg-opacity-80"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center mb-8 text-gray-800"
            >
              Why Choose Our Platform
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: FaGraduationCap, title: "Expert Mentors" },
                { icon: FaChalkboardTeacher, title: "Personalized Learning" },
                { icon: FaUsers, title: "Community Support" },
                { icon: FaLightbulb, title: "Innovative Approach" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-[#4540E1]/5 to-[#3632B0]/5 
                    p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <item.icon className="text-4xl text-[#4540E1] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                </motion.div>
              ))}
            </div>
            <WhyBest />
          </motion.div>
        </div>
      </motion.div>

      {/* Mentorship Process with Interactive Timeline */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 py-12"
      >
        <div className="container mx-auto px-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-xl bg-opacity-80"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center mb-8 text-gray-800"
            >
              Your Mentorship Journey
            </motion.h2>
            <MentorshipProcess />
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Section */}
      <motion.footer
        variants={itemVariants}
        className="relative z-10 bg-white/80 backdrop-blur-xl py-8 mt-12"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="text-gray-600"
          >
            © 2024 MentorConnect. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default MenteeView; 