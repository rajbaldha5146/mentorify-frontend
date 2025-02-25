import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { sendOTP } from '../api/auth';
import { FaUser, FaEnvelope, FaLock, FaUserGraduate, FaBriefcase, FaSpinner, FaShieldAlt } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('mentee');
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    experience: '', // for mentor only
    currentPosition: '', // for mentor only
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      toast.error('Please enter email first');
      return;
    }
    
    setOtpSending(true);
    try {
      const response = await sendOTP(formData.email);
      // console.log(response);
      // console.log(response.success);
      if (response.success) {
        setOtpSent(true);
        toast.success('OTP sent successfully');
        // console.log(response);
      } 
      else if (response.message === 'User already registered') {
        setOtpSent(false);
        toast.error('This email is already registered. Please login instead.');
      }
      else {
        setOtpSent(false);
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      setOtpSent(false);
      toast.error('Error sending OTP');
    } finally {
      setOtpSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = userType === 'mentee' ? '/signup' : '/mentor-signup';
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Signup successful!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('Error during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
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

      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:mx-auto sm:w-full sm:max-w-md text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold text-gray-900 mb-2"
          >
            Join Our Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Start your journey with us today
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <motion.div
            className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 
              backdrop-blur-xl bg-opacity-80"
          >
            {/* User Type Selection */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center space-x-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType('mentee')}
                className={`px-6 py-3 rounded-xl flex items-center space-x-2 
                  transition-all duration-300 ${
                  userType === 'mentee'
                    ? 'bg-[#4540E1] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaUserGraduate />
                <span>Mentee</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType('mentor')}
                className={`px-6 py-3 rounded-xl flex items-center space-x-2 
                  transition-all duration-300 ${
                  userType === 'mentor'
                    ? 'bg-[#4540E1] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaBriefcase />
                <span>Mentor</span>
              </motion.button>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.form
                key={userType}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2 text-[#4540E1]" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 py-3 rounded-xl 
                      border border-gray-300 shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                      focus:border-[#4540E1] transition-all duration-300"
                  />
                </motion.div>

                {/* Email Field with OTP Button */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2 text-[#4540E1]" />
                    Email
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 rounded-xl 
                        border border-gray-300 shadow-sm placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                        focus:border-[#4540E1] transition-all duration-300"
                    />
                    <motion.button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={otpSending}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-[#4540E1] text-white rounded-xl 
                        hover:bg-[#3632B0] transition-all duration-300 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center space-x-2"
                    >
                      {otpSending ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaShieldAlt />
                      )}
                      <span>Send OTP</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* OTP Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaShieldAlt className="inline mr-2 text-[#4540E1]" />
                    OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    required
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 py-3 rounded-xl 
                      border border-gray-300 shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                      focus:border-[#4540E1] transition-all duration-300"
                  />
                </motion.div>

                {/* Mentor-specific fields */}
                <AnimatePresence>
                  {userType === 'mentor' && (
                    <>
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaBriefcase className="inline mr-2 text-[#4540E1]" />
                          Experience
                        </label>
                        <input
                          type="text"
                          name="experience"
                          required
                          onChange={handleInputChange}
                          placeholder="Years of experience or College name with year"
                          className="appearance-none block w-full px-4 py-3 rounded-xl 
                            border border-gray-300 shadow-sm placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                            focus:border-[#4540E1] transition-all duration-300"
                        />
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaBriefcase className="inline mr-2 text-[#4540E1]" />
                          Current Position
                        </label>
                        <input
                          type="text"
                          name="currentPosition"
                          required
                          onChange={handleInputChange}
                          placeholder="Your skills (e.g., Full Stack || React || Node.js)"
                          className="appearance-none block w-full px-4 py-3 rounded-xl 
                            border border-gray-300 shadow-sm placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                            focus:border-[#4540E1] transition-all duration-300"
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* Password Fields */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaLock className="inline mr-2 text-[#4540E1]" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 py-3 rounded-xl 
                      border border-gray-300 shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                      focus:border-[#4540E1] transition-all duration-300"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaLock className="inline mr-2 text-[#4540E1]" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 py-3 rounded-xl 
                      border border-gray-300 shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                      focus:border-[#4540E1] transition-all duration-300"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center space-x-2 
                    py-3 px-4 border border-transparent rounded-xl shadow-sm 
                    text-lg font-medium text-white bg-[#4540E1] 
                    hover:bg-[#3632B0] focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-[#4540E1] transition-all 
                    duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Signing up...</span>
                    </>
                  ) : (
                    <span>Sign Up</span>
                  )}
                </motion.button>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup; 