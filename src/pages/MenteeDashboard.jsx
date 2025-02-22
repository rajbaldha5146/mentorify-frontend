// src/pages/MenteeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenteeNavbar from '../components/common/MenteeNavbar';
import axios from '../api/axios';
import SessionCard from '../components/mentee/SessionCard';
import { Dialog, Rating } from '@mui/material';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { FaStar, FaCalendarCheck, FaCalendarTimes, FaSpinner, FaComments, FaCheckCircle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MenteeDashboard = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [cancelledSessions, setCancelledSessions] = useState([]);
  const [sessionReviews, setSessionReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const menteeId = JSON.parse(localStorage.getItem('user')).id; // Get menteeId from localStorage
      
      const [upcoming, completed, cancelled] = await Promise.all([
        axios.get(`${BASE_URL}/mentee/upcoming-sessions`),
        axios.get(`${BASE_URL}/mentee/completed-sessions`),
        axios.get(`${BASE_URL}/mentee/cancelled-sessions`)
      ]);

      setUpcomingSessions(upcoming.data.sessions);
      setCompletedSessions(completed.data.sessions);
      setCancelledSessions(cancelled.data.sessions);

      // Modified review fetching logic using menteeId from localStorage
      const reviews = {};
      await Promise.all(
        completed.data.sessions.map(async (session) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/mentee/reviews/${menteeId}/${session.sessionId}`
            );
            if (response.data.data.reviews.length > 0) {
              reviews[session.sessionId] = response.data.data.reviews[0];
            }
          } catch (error) {
            console.error('Error fetching review:', error);
          }
        })
      );
      console.log(reviews);
      setSessionReviews(reviews);
      console.log(sessionReviews);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedSession) {
      toast.error('Error: No session selected for review.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/mentee/reviews/submit`, {
        sessionId: selectedSession.sessionId,
        mentorId: selectedSession.mentor.id,
        rating,
        comment
      });

      if (response.data.success) {
        toast.success('Review submitted successfully!');
        setIsReviewModalOpen(false);
        setSessionReviews(prev => ({
          ...prev,
          [selectedSession.sessionId]: {
            rating,
            comment,
            createdAt: new Date().toISOString()
          }
        }));
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.response?.data?.message || 'Error submitting review');
    }

    // Reset form
    setRating(0);
    setComment('');
    setSelectedSession(null);
  };

  const handleReviewClick = (session) => {
    setSelectedSession(session);
    setIsReviewModalOpen(true);
  };

  // Stagger animation for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) return <div>Loading...</div>;

  console.log('Session Reviews:', sessionReviews);
  console.log('Completed Sessions:', completedSessions);

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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8 relative z-10"
      >
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <FaSpinner className="animate-spin text-4xl text-[#4540E1]" />
          </motion.div>
        ) : (
          <>
            {/* Upcoming Sessions Section */}
            <motion.section 
              variants={sectionVariants}
              className="mb-12 bg-white rounded-2xl shadow-xl p-6 backdrop-blur-xl bg-opacity-80"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaCalendarCheck className="text-2xl text-[#4540E1]" />
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Sessions</h2>
              </div>
              <AnimatePresence>
                <div className="space-y-4">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session, index) => (
                      <motion.div
                        key={session.sessionId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SessionCard 
                          session={session}
                          type="upcoming"
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-500 text-center py-4"
                    >
                      No upcoming sessions
                    </motion.p>
                  )}
                </div>
              </AnimatePresence>
            </motion.section>

            {/* Completed Sessions Section */}
            <motion.section 
              variants={sectionVariants}
              className="mb-12 bg-white rounded-2xl shadow-xl p-6 backdrop-blur-xl bg-opacity-80"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaCheckCircle className="text-2xl text-green-500" />
                <h2 className="text-2xl font-bold text-gray-800">Completed Sessions</h2>
              </div>
              <AnimatePresence>
                <div className="space-y-4">
                  {completedSessions.length > 0 ? (
                    completedSessions.map((session, index) => (
                      <motion.div
                        key={session.sessionId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                      >
                        <SessionCard 
                          session={session}
                          type="completed"
                        />
                        {sessionReviews[session.sessionId] ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 p-4 bg-gray-50 rounded-xl"
                          >
                            <p className="text-sm text-gray-600 mb-2 flex items-center">
                              <FaComments className="mr-2 text-[#4540E1]" />
                              Your Review
                            </p>
                            <Rating 
                              value={sessionReviews[session.sessionId].rating} 
                              readOnly 
                              size="small"
                            />
                            <p className="text-gray-600 mt-2 text-sm">
                              {sessionReviews[session.sessionId].comment}
                            </p>
                          </motion.div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleReviewClick(session)}
                            className="mt-4 w-full bg-[#4540E1] text-white px-6 py-2 rounded-xl
                              hover:bg-[#3632B0] transition-all duration-300 flex items-center 
                              justify-center space-x-2"
                          >
                            <FaStar className="text-yellow-300" />
                            <span>Give Review</span>
                          </motion.button>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-500 text-center py-4"
                    >
                      No completed sessions
                    </motion.p>
                  )}
                </div>
              </AnimatePresence>
            </motion.section>

            {/* Cancelled Sessions Section */}
            <motion.section 
              variants={sectionVariants}
              className="mb-12 bg-white rounded-2xl shadow-xl p-6 backdrop-blur-xl bg-opacity-80"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaCalendarTimes className="text-2xl text-red-500" />
                <h2 className="text-2xl font-bold text-gray-800">Cancelled Sessions</h2>
              </div>
              <AnimatePresence>
                <div className="space-y-4">
                  {cancelledSessions.length > 0 ? (
                    cancelledSessions.map((session, index) => (
                      <motion.div
                        key={session.sessionId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SessionCard 
                          session={session}
                          type="cancelled"
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-500 text-center py-4"
                    >
                      No cancelled sessions
                    </motion.p>
                  )}
                </div>
              </AnimatePresence>
            </motion.section>
          </>
        )}

        {/* Review Modal */}
        <Dialog
          open={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            className: "rounded-2xl backdrop-blur-xl bg-opacity-90"
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Submit Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-700">Rating</label>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                  className="text-[#4540E1]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#4540E1]/20 
                    focus:border-[#4540E1] transition-all duration-300"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-2 bg-[#4540E1] text-white rounded-xl 
                    hover:bg-[#3632B0] transition-all duration-300"
                >
                  Submit Review
                </motion.button>
              </div>
            </form>
          </motion.div>
        </Dialog>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default MenteeDashboard;