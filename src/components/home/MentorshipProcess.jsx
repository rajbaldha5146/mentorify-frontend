import React from 'react';
import { motion } from 'framer-motion';
// import menteeImage from '../../assets/mentee-image.png';
import student from "../../assets/student.png"
import eclipse from "../../assets/Vector.png"

const MentorshipProcess = () => {
  const steps = [
    { 
      number: "01", 
      text: "Choose a Mentor",
      icon: "👨‍🏫",
      description: "Browse through our curated list of expert mentors"
    },
    { 
      number: "02", 
      text: "Register and Verify",
      icon: "✅",
      description: "Complete your profile and verify your account"
    },
    { 
      number: "03", 
      text: "Propose Session Times",
      icon: "📅",
      description: "Select convenient time slots that work for you"
    },
    { 
      number: "04", 
      text: "Await Approval",
      icon: "⏳",
      description: "Get confirmation from your chosen mentor"
    },
    { 
      number: "05", 
      text: "Start Your Journey",
      icon: "🚀",
      description: "Begin your mentorship journey towards success"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="overflow-hidden">
      {/* Main Content Section */}
      <div className="relative bg-gradient-to-b from-[#FFE5A3] to-[#FFF8E7] min-h-screen">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5"></div>
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-1/3 -right-48 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-48 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16 flex flex-col lg:flex-row items-center relative z-10">
          {/* Left side - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative mb-12 lg:mb-0"
          >
            <motion.img 
              src={eclipse} 
              alt="Background shape" 
              className="absolute w-auto h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.img 
              src={student} 
              alt="Student" 
              className="relative z-10 w-full h-auto max-w-md mx-auto drop-shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 lg:pl-12"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold mb-6 text-[#2b00ff] bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Effortless Mentorship
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg mb-12 text-gray-700"
            >
              At Mentorify, we make connecting with mentors simple and streamlined.
            </motion.p>
            
            <motion.div 
              variants={containerVariants}
              className="space-y-6"
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl 
                    transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden 
                    group border border-white/20"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-purple-600 
                    transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300"/>
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 
                          font-bold">{step.number}</span>
                        <h3 className="font-semibold text-xl text-gray-800">{step.text}</h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipProcess; 