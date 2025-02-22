import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../api/axios';
import MentorCard from '../components/mentee/MentorCard';
import MenteeNavbar from '../components/common/MenteeNavbar';
import { toast } from 'react-hot-toast';
import { FaSearch, FaFilter, FaSpinner, FaUserTie } from 'react-icons/fa';

const MentorListing = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('/mentor-data');
        setMentors(response.data.mentor);
      } catch (error) {
        console.error('Error fetching mentors:', error);
        toast.error('Failed to load mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = selectedExpertise === 'all' || mentor.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const uniqueExpertise = ['all', ...new Set(mentors.flatMap(mentor => mentor.expertise))];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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

      <MenteeNavbar />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-8 relative z-10"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Find Your Perfect Mentor
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Connect with experienced professionals who can guide your journey
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-xl bg-opacity-80"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <motion.div 
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
            >
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 
                  focus:ring-2 focus:ring-[#4540E1]/20 focus:border-[#4540E1] 
                  transition-all duration-300"
              />
            </motion.div>

            {/* Expertise Filter */}
            <motion.div 
              className="md:w-64"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 
                    focus:ring-2 focus:ring-[#4540E1]/20 focus:border-[#4540E1] 
                    transition-all duration-300 appearance-none"
                >
                  {uniqueExpertise.map(expertise => (
                    <option key={expertise} value={expertise}>
                      {expertise === 'all' ? 'All Expertise' : expertise}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mentors Grid */}
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <FaSpinner className="animate-spin text-4xl text-[#4540E1]" />
          </motion.div>
        ) : (
          <AnimatePresence>
            {filteredMentors.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <FaUserTie className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  No mentors found matching your criteria.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredMentors.map((mentor, index) => (
                  <motion.div
                    key={mentor._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.1 }}
                  >
                    <MentorCard mentor={mentor} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default MentorListing; 