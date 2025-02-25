import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
// import { loginMentee, loginMentor } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { FaUser, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [userType, setUserType] = useState(location.state?.userType || 'mentee');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Add useEffect to handle userType changes from navigation
  useEffect(() => {
    if (location.state?.userType) {
      setUserType(location.state.userType);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `/${userType}-login`,
        formData
      );

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Update auth context
        await login(response.data.user);

        // Show success message
        toast.success('Login successful!');

        // Redirect based on role
        if (response.data.user.role === 'mentee') {
          navigate('/mentee/MenteeView');
        } else if (response.data.user.role === 'mentor') {
          navigate('/mentor/MentorView');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-96 h-96 bg-[#4540E1] rounded-full filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#3632B0] rounded-full filter blur-3xl"
      />

      <div className="relative flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Sign in to continue your journey
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 
            backdrop-blur-xl bg-opacity-80">
            <div className="flex justify-center space-x-4 mb-8">
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
                <FaUser className="text-lg" />
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
                <FaUser className="text-lg" />
                <span>Mentor</span>
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={userType}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2 text-[#4540E1]" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="appearance-none block w-full px-4 py-3 rounded-xl 
                      border border-gray-300 shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                      focus:border-[#4540E1] transition-all duration-300"
                    onChange={handleInputChange}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaLock className="inline mr-2 text-[#4540E1]" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="appearance-none block w-full px-4 py-3 rounded-xl 
                      border border-gray-300 shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-[#4540E1]/20 
                      focus:border-[#4540E1] transition-all duration-300"
                    onChange={handleInputChange}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full flex justify-center items-center space-x-2 
                    py-3 px-4 border border-transparent rounded-xl text-lg 
                    font-medium text-white bg-[#4540E1] hover:bg-[#3632B0] 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-[#4540E1] transition-all duration-300 
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-6"
                >
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      to="/signup"
                      state={{ userType: userType }}
                      className="font-medium text-[#4540E1] hover:text-[#3632B0] 
                        transition-colors duration-300"
                    >
                      Sign up
                    </Link>
                  </p>
                </motion.div>
              </motion.form>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 