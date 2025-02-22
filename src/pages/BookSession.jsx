import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from '../api/axios';
import { FaCalendarAlt, FaClock, FaUser, FaPaperPlane, FaSpinner } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const BookSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mentor = location.state?.mentor;

  const [mentorAvailability, setMentorAvailability] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    day: '',
    date: '',
    timeSlot: '',
    message: ''
  });

  useEffect(() => {
    const fetchMentorAvailability = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mentee/mentor-availability/${mentor._id}`);
        setMentorAvailability(response.data.mentorAvailability);
      } catch (error) {
        toast.error('Failed to fetch mentor availability');
      }
    };

    if (mentor?._id) {
      fetchMentorAvailability();
    }
  }, [mentor]);

  useEffect(() => {
    if (selectedDay && mentorAvailability) {
      const daySlots = mentorAvailability.slotsPerDay.find(
        slot => slot.day === selectedDay
      );
      setAvailableTimeSlots(daySlots?.slots || []);
    }
  }, [selectedDay, mentorAvailability]);

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    setFormData(prev => ({
      ...prev,
      day,
      timeSlot: '',
      date: ''
    }));
  };

  const getValidDates = () => {
    if (!selectedDay) return [];

    const dates = [];
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    while (today <= nextMonth) {
      if (today.toLocaleDateString('en-US', { weekday: 'long' }) === selectedDay) {
        dates.push(new Date(today));
      }
      today.setDate(today.getDate() + 1);
    }
    return dates;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/mentee/book-session', {
        mentorId: mentor._id,
        ...formData
      });

      if (response.data.success) {
        toast.success('Session booked successfully!');
        setTimeout(() => {
          setLoading(false);
          navigate('/mentee/MenteeView');
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Failed to book session');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Mentor Info Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-[#4540E1]/10 rounded-full flex items-center justify-center">
              <FaUser className="text-2xl text-[#4540E1]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Book a Session with {mentor?.name}</h2>
              <p className="text-gray-600">{mentor?.currentPosition}</p>
            </div>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2 text-[#4540E1]" />
                Day
              </label>
              <select
                name="day"
                value={formData.day}
                onChange={handleDayChange}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm 
                  focus:border-[#4540E1] focus:ring focus:ring-[#4540E1]/20 
                  transition-all duration-300"
                required
              >
                <option value="">Select Day</option>
                {mentorAvailability?.availableDays.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2 text-[#4540E1]" />
                Date
              </label>
              <select
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm 
                  focus:border-[#4540E1] focus:ring focus:ring-[#4540E1]/20 
                  transition-all duration-300"
                required
                disabled={!selectedDay}
              >
                <option value="">Select Date</option>
                {getValidDates().map((date) => (
                  <option key={date} value={date.toISOString().split('T')[0]}>
                    {date.toLocaleDateString()}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaClock className="inline mr-2 text-[#4540E1]" />
                Time Slot
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm 
                  focus:border-[#4540E1] focus:ring focus:ring-[#4540E1]/20 
                  transition-all duration-300"
                required
                disabled={!selectedDay}
              >
                <option value="">Select Time Slot</option>
                {availableTimeSlots.map((slot) => (
                  <option key={slot._id} value={`${slot.startTime} - ${slot.endTime}`}>
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPaperPlane className="inline mr-2 text-[#4540E1]" />
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm 
                  focus:border-[#4540E1] focus:ring focus:ring-[#4540E1]/20 
                  transition-all duration-300 resize-none"
                rows="4"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex justify-center items-center space-x-2 py-3 px-4 
                border border-transparent rounded-xl shadow-sm text-lg font-medium text-white 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4540E1] hover:bg-[#3632B0]'} 
                transition-all duration-300 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-[#4540E1]`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Booking Session...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                  <span>Book Session</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookSession;
