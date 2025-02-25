import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MentorNavbar from "../../components/common/MentorNavbar";
import axios from "../../api/axios";
import { toast } from "react-hot-toast";
import { FaCalendarCheck, FaCalendarTimes, FaCheckCircle, FaTimesCircle, FaSpinner, FaUserGraduate, FaCalendarAlt, FaClock, FaEnvelope } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
// console.log(BASE_URL);

const MentorView = () => {
  const [pendingSessions, setPendingSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [cancelledSessions, setCancelledSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({
    accepting: new Set(),
    cancelling: new Set()
  });

  // Move fetchSessions outside useEffect so we can reuse it
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const [pendingRes, upcomingRes, completedRes, cancelledRes] =
        await Promise.all([
          axios.get(`${BASE_URL}/mentor/pending-requests`),
          axios.get(`${BASE_URL}/mentor/upcoming-accepted-sessions`),
          axios.get(`${BASE_URL}/mentor/completed-sessions`),
          axios.get(`${BASE_URL}/mentor/cancelled-sessions`),
        ]);

      setPendingSessions(pendingRes.data.requests || []);
      setUpcomingSessions(upcomingRes.data.sessions || []);
      setCompletedSessions(completedRes.data.sessions || []);
      setCancelledSessions(cancelledRes.data.sessions || []);
    } catch (error) {
      toast.error("Failed to fetch sessions");
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use fetchSessions in useEffect
  useEffect(() => {
    fetchSessions();
  }, []);

  // Handle session acceptance
  const handleAcceptSession = async (sessionId) => {
    try {
      setActionLoading(prev => ({
        ...prev,
        accepting: new Set([...prev.accepting, sessionId])
      }));

      const response = await axios.post(`${BASE_URL}/mentor/accept-session`, {
        sessionId,
      });

      if (response.data.success) {
        toast.success("Session accepted successfully");
        // Refresh all sessions data
        await fetchSessions();
      }
    } catch (error) {
      console.error("Error accepting session:", error);
      toast.error(error.response?.data?.message || "Failed to accept session");
    } finally {
      setActionLoading(prev => ({
        ...prev,
        accepting: new Set([...prev.accepting].filter(id => id !== sessionId))
      }));
    }
  };

  // Handle session cancellation
  const handleCancelSession = async (sessionId) => {
    try {
      setActionLoading(prev => ({
        ...prev,
        cancelling: new Set([...prev.cancelling, sessionId])
      }));

      const response = await axios.delete(
        `${BASE_URL}/mentor/delete-session/${sessionId}`
      );

      if (response.data.success) {
        toast.success("Session cancelled successfully");
        // Refresh all sessions data
        await fetchSessions();
      }
    } catch (error) {
      console.error("Error cancelling session:", error);
      toast.error(error.response?.data?.message || "Failed to cancel session");
    } finally {
      setActionLoading(prev => ({
        ...prev,
        cancelling: new Set([...prev.cancelling].filter(id => id !== sessionId))
      }));
    }
  };

  // Handle session completion
  const handleCompleteSession = async (sessionId) => {
    try {
      const response = await axios.post(`${BASE_URL}/mentor/update-completed-sessions`, {
        sessionId
      });

      if (response.data.success) {
        toast.success('Session marked as completed');
        // Remove from upcoming sessions
        setUpcomingSessions(prev => 
          prev.filter(session => session.sessionId !== sessionId)
        );
        // Add to completed sessions
        setCompletedSessions(prev => [
          response.data.completedSession,
          ...prev
        ]);
      }
    } catch (error) {
      console.error('Error completing session:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to mark session as completed'
      );
    }
  };

  const SessionCard = ({ session, type, onAccept, onCancel, onComplete }) => {
    const [meetingLink, setMeetingLink] = useState('');
    const [isSubmittingLink, setIsSubmittingLink] = useState(false);
    const isAccepting = actionLoading.accepting.has(session.sessionId);
    const isCancelling = actionLoading.cancelling.has(session.sessionId);

    const handleMeetingLinkSubmit = async () => {
      if (!meetingLink.startsWith('https://meet.google.com/')) {
        toast.error('Please enter a valid Google Meet link');
        return;
      }

      try {
        setIsSubmittingLink(true);
        const response = await axios.post(`${BASE_URL}/mentor/add-meeting-link`, {
          sessionId: session.sessionId,
          meetingLink: meetingLink
        });

        if (response.data.success) {
          toast.success('Meeting link sent to mentee successfully');
          setMeetingLink(''); // Clear the input
        }
      } catch (error) {
        console.error('Error sending meeting link:', error);
        toast.error(error.response?.data?.message || 'Failed to send meeting link');
      } finally {
        setIsSubmittingLink(false);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -5 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4540E1]/5 to-[#3632B0]/5 
          rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
        
        <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl 
          transition-all duration-300 overflow-hidden">
          {/* Top Decorative Bar */}
          <div className="h-2 bg-gradient-to-r from-[#4540E1] to-[#3632B0]" />
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#4540E1]/10 flex items-center 
                  justify-center text-[#4540E1]">
                  <FaUserGraduate className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {session.mentee?.name || "Unknown"}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaEnvelope className="mr-2" />
                    {session.mentee?.email || "No email provided"}
                  </div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  type === 'completed' ? 'bg-green-100 text-green-800' :
                  type === 'cancelled' ? 'bg-red-100 text-red-800' :
                  type === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaCalendarAlt className="text-[#4540E1]" />
                <span>{session.day}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaCalendarAlt className="text-[#4540E1]" />
                <span>{new Date(session.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaClock className="text-[#4540E1]" />
                <span>{session.timeSlot}</span>
              </div>
            </div>

            {session.message && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-600 italic">"{session.message}"</p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              {type === 'pending' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAccept(session.sessionId)}
                    disabled={isAccepting}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 
                      text-white rounded-lg hover:bg-green-600 disabled:bg-green-300 
                      disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isAccepting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Accepting...</span>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        <span>Accept</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCancel(session.sessionId)}
                    disabled={isCancelling}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 
                      text-white rounded-lg hover:bg-red-600 disabled:bg-red-300 
                      disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isCancelling ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Cancelling...</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle />
                        <span>Cancel</span>
                      </>
                    )}
                  </motion.button>
                </>
              )}

              {type === 'upcoming' && (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={meetingLink}
                      onChange={(e) => setMeetingLink(e.target.value)}
                      placeholder="Enter Google Meet link"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-[#4540E1] 
                        focus:border-transparent"
                      disabled={isSubmittingLink}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMeetingLinkSubmit}
                      disabled={isSubmittingLink || !meetingLink}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#4540E1] 
                        text-white rounded-lg hover:bg-[#3632B0] disabled:bg-[#4540E1]/50 
                        disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isSubmittingLink ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaEnvelope />
                          <span>Send Link</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onComplete(session.sessionId)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 
                      bg-[#4540E1] text-white rounded-lg hover:bg-[#3632B0] 
                      transition-all duration-300"
                  >
                    <FaCalendarCheck />
                    <span>Mark Complete</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#4540E1] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <MentorNavbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-24"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Sessions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
              <FaCalendarAlt className="text-[#4540E1]" />
              <span>Pending Sessions</span>
            </h2>
            
            <AnimatePresence>
              {pendingSessions.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 italic"
                >
                  No pending sessions
                </motion.p>
              ) : (
                pendingSessions.map(session => (
                  <SessionCard
                    key={session.sessionId}
                    session={session}
                    type="pending"
                    onAccept={handleAcceptSession}
                    onCancel={handleCancelSession}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
              <FaCalendarCheck className="text-[#4540E1]" />
              <span>Upcoming Sessions</span>
            </h2>
            
            <AnimatePresence>
              {upcomingSessions.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 italic"
                >
                  No upcoming sessions
                </motion.p>
              ) : (
                upcomingSessions.map(session => (
                  <SessionCard
                    key={session.sessionId}
                    session={session}
                    type="upcoming"
                    onComplete={handleCompleteSession}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {/* Completed Sessions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
              <FaCheckCircle className="text-[#4540E1]" />
              <span>Completed Sessions</span>
            </h2>
            
            <AnimatePresence>
              {completedSessions.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 italic"
                >
                  No completed sessions
                </motion.p>
              ) : (
                completedSessions.map(session => (
                  <SessionCard
                    key={session.sessionId}
                    session={session}
                    type="completed"
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cancelled Sessions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
              <FaTimesCircle className="text-[#4540E1]" />
              <span>Cancelled Sessions</span>
            </h2>
            
            <AnimatePresence>
              {cancelledSessions.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 italic"
                >
                  No cancelled sessions
                </motion.p>
              ) : (
                cancelledSessions.map(session => (
                  <SessionCard
                    key={session.sessionId}
                    session={session}
                    type="cancelled"
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MentorView;
