import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaHandshake, FaChartLine, FaGraduationCap } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Contact from '../components/home/Contact';
const AboutUs = () => {
  const values = [
    {
      icon: <FaLightbulb />,
      title: "Innovation in Learning",
      description: "We're revolutionizing mentorship through cutting-edge technology and personalized learning experiences."
    },
    {
      icon: <FaHandshake />,
      title: "Trust & Reliability",
      description: "Building strong, trustworthy relationships between mentors and mentees is at the core of our platform."
    },
    {
      icon: <FaChartLine />,
      title: "Continuous Growth",
      description: "We believe in fostering an environment of continuous learning and professional development."
    },
    {
      icon: <FaGraduationCap />,
      title: "Expert Guidance",
      description: "Our platform connects you with industry experts who are passionate about sharing their knowledge."
    }
  ];

  const stats = [
    { number: "500+", label: "Active Mentors" },
    { number: "10K+", label: "Successful Sessions" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "30+", label: "Countries Reached" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content with proper spacing */}
      <main className="flex-grow bg-gradient-to-br from-white to-[#F8F8FF] py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-6"
        >
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.h1 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-[#FFB800]">About </span>
              <span className="relative text-[#4540E1]">
                Mentorify
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFB800]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
            >
              Empowering individuals through personalized mentorship, connecting aspiring 
              professionals with industry experts to foster growth and success.
            </motion.p>
          </div>

          {/* Mission Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              At Mentorify, we're dedicated to breaking down barriers in professional development. 
              Our platform creates meaningful connections between experienced mentors and ambitious 
              mentees, fostering an environment where knowledge sharing leads to collective growth 
              and success.
            </p>
          </motion.div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-3xl text-[#4540E1] mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 bg-[#4540E1] rounded-2xl shadow-xl p-8 md:p-12 text-white"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</h3>
                  <p className="text-base md:text-lg opacity-90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Contact />

      <Footer />
    </div>
  );
};

export default AboutUs; 