import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const Stats = () => {
  const stats = [
    { 
      number: 150, 
      label: "Total Courses",
      icon: "📚",
      suffix: "+"
    },
    { 
      number: 250, 
      label: "Total Instructors",
      icon: "👨‍🏫",
      suffix: ""
    },
    { 
      number: 35, 
      label: "Total Students",
      icon: "👨‍🎓",
      suffix: "K+"
    },
  ];

  return (
    <div className="relative bg-gradient-to-r from-[#4540E1] to-[#3632B0] py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-96 h-96 bg-white/10 rounded-full -bottom-32 -right-32"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 
                transform transition-all duration-300 group-hover:bg-white/20">
                <motion.span 
                  className="text-4xl mb-4 block"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.icon}
                </motion.span>
                <div className="flex items-baseline space-x-1">
                  <h2 className="text-5xl font-bold text-white mb-3">
                    <CountUp 
                      end={stat.number} 
                      duration={2.5} 
                      enableScrollSpy 
                      scrollSpyOnce
                    />
                  </h2>
                  <span className="text-3xl font-bold text-white">{stat.suffix}</span>
                </div>
                <p className="text-xl text-white/90">{stat.label}</p>
                
                {/* Decorative line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 
                  bg-gradient-to-r from-white/0 via-white to-white/0 group-hover:w-3/4 
                  transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Stats; 