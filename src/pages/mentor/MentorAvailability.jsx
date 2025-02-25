import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from '../../api/axios';
import MentorNavbar from '../../components/common/MentorNavbar';
import { FaClock, FaPlus, FaTrash, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MentorAvailability = () => {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    availableDays: [],
    slotsPerDay: []
  });

  // Fetch current availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('/mentor/availability');
        if (response.data.availability) {
          setAvailability(response.data.availability);
          setFormData(response.data.availability);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
        toast.error('Failed to fetch availability');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const handleDayChange = (e) => {
    const { checked, value } = e.target;
    setFormData(prev => {
      const newDays = checked 
        ? [...prev.availableDays, value]
        : prev.availableDays.filter(day => day !== value);
      
      // Update slotsPerDay when days change
      const newSlotsPerDay = checked 
        ? [...prev.slotsPerDay, { day: value, slots: [{ startTime: '', endTime: '', isBooked: false }] }]
        : prev.slotsPerDay.filter(slot => slot.day !== value);

      return {
        ...prev,
        availableDays: newDays,
        slotsPerDay: newSlotsPerDay
      };
    });
  };

  // Updated conversion functions
  const convertTo24Hour = (time12h) => {
    if (!time12h) return '';
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);

    if (hours === 12) {
      hours = modifier === 'PM' ? 12 : 0;
    } else if (modifier === 'PM') {
      hours += 12;
    }

    // Convert numbers to strings and ensure 2 digits
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const convertTo12Hour = (time24h) => {
    if (!time24h) return '';
    let [hours, minutes] = time24h.split(':');
    hours = parseInt(hours);
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Ensure minutes has 2 digits
    minutes = minutes.padStart(2, '0');
    
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleSlotChange = (dayIndex, slotIndex, field, value) => {
    setFormData(prev => {
      const newSlotsPerDay = [...prev.slotsPerDay];
      if (!newSlotsPerDay[dayIndex].slots[slotIndex]) {
        newSlotsPerDay[dayIndex].slots[slotIndex] = { 
          startTime: '', 
          endTime: '', 
          isBooked: false 
        };
      }
      // Convert the 24-hour time input value to 12-hour format before saving
      const time12h = convertTo12Hour(value);
      newSlotsPerDay[dayIndex].slots[slotIndex][field] = time12h;
      return { ...prev, slotsPerDay: newSlotsPerDay };
    });
  };

  const addSlot = (dayIndex) => {
    setFormData(prev => {
      const newSlotsPerDay = prev.slotsPerDay.map((daySlot, index) => {
        if (index === dayIndex) {
          return {
            ...daySlot,
            slots: [
              ...daySlot.slots,
              { startTime: '', endTime: '', isBooked: false }
            ]
          };
        }
        return daySlot;
      });
  
      return { ...prev, slotsPerDay: newSlotsPerDay };
    });
  };
  

  const removeSlot = (dayIndex, slotIndex) => {
    setFormData(prev => {
      const newSlotsPerDay = [...prev.slotsPerDay];
      newSlotsPerDay[dayIndex].slots.splice(slotIndex, 1);
      return { ...prev, slotsPerDay: newSlotsPerDay };
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original availability data
    if (availability) {
      setFormData({
        availableDays: [...availability.availableDays],
        slotsPerDay: JSON.parse(JSON.stringify(availability.slotsPerDay))
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log('Submitting formData:', formData); // Debug log
      let response;
      
      if (availability) {
        // Use PUT for updating existing availability
        response = await axios.put('/mentor/update-availability', formData);
      } else {
        // Use POST for setting new availability
        response = await axios.post('/mentor/set-availability', formData);
      }
      
      if (response.data.success) {
        toast.success(availability ? 'Availability updated!' : 'Availability set!');
        setAvailability(response.data.availability);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error('Failed to save availability');
    }
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
        className="max-w-6xl mx-auto p-6 pt-24"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800">
              {availability ? 'Update Availability' : 'Set Availability'}
            </h2>
            {!isEditing && availability && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="bg-[#4540E1] text-white px-6 py-3 rounded-xl hover:bg-[#3632B0] 
                  transition-all duration-300 flex items-center space-x-2"
              >
                <FaClock />
                <span>Update Schedule</span>
              </motion.button>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {!isEditing && availability ? (
              <motion.div
                key="current-availability"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {availability.availableDays.map((day, index) => (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <FaCalendarAlt className="text-[#4540E1] text-xl" />
                      <h3 className="text-xl font-semibold text-gray-800">{day}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availability.slotsPerDay
                        .find(slot => slot.day === day)?.slots
                        .map((slot, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            className={`p-4 rounded-lg flex items-center justify-between
                              ${slot.isBooked 
                                ? 'bg-red-50 text-red-700' 
                                : 'bg-green-50 text-green-700'}`}
                          >
                            <span className="font-medium">
                              {slot.startTime} - {slot.endTime}
                            </span>
                            {slot.isBooked ? (
                              <FaTimes className="text-red-500" />
                            ) : (
                              <FaCheck className="text-green-500" />
                            )}
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.form
                key="edit-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <motion.label
                      key={day}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl 
                        cursor-pointer transition-all duration-300 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        value={day}
                        checked={formData.availableDays.includes(day)}
                        onChange={handleDayChange}
                        className="form-checkbox h-5 w-5 text-[#4540E1] rounded 
                          focus:ring-[#4540E1] transition-all duration-300"
                      />
                      <span className="font-medium text-gray-700">{day}</span>
                    </motion.label>
                  ))}
                </div>

                <div className="space-y-6">
                  {formData.slotsPerDay.map((daySlot, dayIndex) => (
                    <motion.div
                      key={daySlot.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIndex * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">{daySlot.day}</h3>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addSlot(dayIndex)}
                          className="flex items-center space-x-2 text-[#4540E1] hover:text-[#3632B0] 
                            transition-colors duration-300"
                        >
                          <FaPlus />
                          <span>Add Slot</span>
                        </motion.button>
                      </div>

                      <div className="space-y-4">
                        {daySlot.slots.map((slot, slotIndex) => (
                          <motion.div
                            key={slotIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-4"
                          >
                            <input
                              type="time"
                              value={convertTo24Hour(slot.startTime)}
                              onChange={(e) => handleSlotChange(dayIndex, slotIndex, 'startTime', e.target.value)}
                              className="form-input rounded-lg border-gray-300 focus:border-[#4540E1] 
                                focus:ring focus:ring-[#4540E1]/20 transition-all duration-300"
                              required
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={convertTo24Hour(slot.endTime)}
                              onChange={(e) => handleSlotChange(dayIndex, slotIndex, 'endTime', e.target.value)}
                              className="form-input rounded-lg border-gray-300 focus:border-[#4540E1] 
                                focus:ring focus:ring-[#4540E1]/20 transition-all duration-300"
                              required
                            />
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeSlot(dayIndex, slotIndex)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-300"
                            >
                              <FaTrash />
                            </motion.button>
                            {slot.isBooked && (
                              <span className="text-red-500 text-sm">Booked</span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4">
                  {isEditing && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(availability);
                      }}
                      className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 
                        hover:bg-gray-300 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                  )}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl bg-[#4540E1] text-white 
                      hover:bg-[#3632B0] transition-all duration-300"
                  >
                    {availability ? 'Update' : 'Save'} Availability
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MentorAvailability; 