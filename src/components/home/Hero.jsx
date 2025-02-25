import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import mentor from "../../assets/mentor-image.png"

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8FF] overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-8 py-20 lg:py-24">
        {/* Left Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-[#FFB800] relative inline-block
              after:content-[''] after:absolute after:-bottom-1 after:left-0 
              after:w-full after:h-[6px] after:bg-[#FFB800]/30 after:-z-10">Find</span> <span className="text-[#4540E1] relative inline-block
              after:content-[''] after:absolute after:-bottom-1 after:left-0 
              after:w-full after:h-[6px] after:bg-[#FFB800]/30 after:-z-10">the Right</span><br />
            <span className="text-[#4540E1]">Mentor</span><br />
            <TypeAnimation
              sequence={[
                'Anytime',
                1000,
                'Anywhere',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-black"
            />
          </motion.h1>

          <motion.p 
            className="text-gray-600 mb-8 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Connect with experienced professionals, gain valuable insights, and 
            accelerate your career growth with one-on-one mentorship sessions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              to="/signup"
              className="group relative bg-[#FFB800] text-black px-12 py-4 rounded-2xl 
                inline-block text-lg font-semibold transition-all duration-300
                hover:bg-[#E6A600] hover:shadow-xl hover:shadow-[#FFB800]/20 
                active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">JOIN AS A MENTEE</span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r 
                from-[#FFB800] via-[#FFD700] to-[#FFB800] transition-all 
                duration-300 group-hover:w-full -z-0"></div>
            </Link>

            <Link 
              to="/signup"
              className="group relative border-2 border-[#4540E1] text-[#4540E1] 
                px-12 py-4 rounded-2xl inline-block text-lg font-semibold 
                transition-all duration-300 hover:text-white hover:shadow-xl 
                hover:shadow-[#4540E1]/20 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">BECOME A MENTOR</span>
              <div className="absolute inset-0 h-full w-0 bg-[#4540E1] 
                transition-all duration-300 group-hover:w-full -z-0"></div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div 
          className="w-full lg:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="absolute top-0 right-0 w-[90%] h-[100%] bg-[#FFE5A3] 
              rounded-tl-[100px] rounded-br-[100px] -z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFE5A3] 
              to-[#FFD700]/30 rounded-tl-[100px] rounded-br-[100px]"></div>
          </motion.div>
          
          <motion.img 
            src={mentor} 
            alt="Mentor" 
            className="w-[90%] h-auto relative z-10 ml-auto drop-shadow-2xl
              hover:transform hover:scale-105 transition-transform duration-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          {/* Floating Elements */}
          <motion.div 
            className="absolute -top-10 right-20 bg-white p-4 rounded-xl shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">🎯</span>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-10 bg-white p-4 rounded-xl shadow-lg"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <span className="text-2xl">💡</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 