import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: "support@mentorify.com",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      details: "123 Mentorship Street, Knowledge City",
      color: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-24 overflow-hidden">
      {/* Background Decorations */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-[#4540E1]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-[#4540E1]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-[#FFB800]">Get in </span>
            <span className="relative text-[#4540E1]">
              Touch
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFB800]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${info.color} 
                blur-xl group-hover:blur-2xl transition-all duration-300`} />
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl 
                transition-all duration-300 text-center">
                <motion.div 
                  className="text-4xl text-[#4540E1] mb-4 inline-block"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {info.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4540E1] 
                    focus:ring-2 focus:ring-[#4540E1]/20 transition-all duration-300 outline-none"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4540E1] 
                    focus:ring-2 focus:ring-[#4540E1]/20 transition-all duration-300 outline-none"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4540E1] 
                  focus:ring-2 focus:ring-[#4540E1]/20 transition-all duration-300 outline-none"
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <textarea
                rows="6"
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4540E1] 
                  focus:ring-2 focus:ring-[#4540E1]/20 transition-all duration-300 outline-none resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#4540E1] text-white py-4 px-8 rounded-lg font-semibold 
                hover:bg-[#3632B0] transition-all duration-300 flex items-center justify-center 
                space-x-2 group"
            >
              <span>Send Message</span>
              <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 
                transition-transform duration-300" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 