import React from 'react';
import { motion } from 'framer-motion';

const WhyBest = () => {
  const features = [
    {
      icon: "📱",
      title: "Digital Platform",
      description: "Access our platform anytime, anywhere through our digital solutions",
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: "🎯",
      title: "Optimal Ideation",
      description: "Where thoughts meet real-world insights through our focused and clear path",
      color: "from-green-500/20 to-teal-500/20"
    },
    {
      icon: "🤝",
      title: "Favorable Setting",
      description: "Strong, supportive bonds between mentors and mentees",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: "💡",
      title: "Effective Interaction",
      description: "Deep insights and direct feedback to help you grow through sessions",
      color: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: "⏰",
      title: "Flexible Time",
      description: "Set sessions according to your time and have the most convenient learning",
      color: "from-yellow-500/20 to-amber-500/20"
    },
    {
      icon: "✅",
      title: "Reliable",
      description: "Verified mentors provide reliable guidance you can trust",
      color: "from-indigo-500/20 to-violet-500/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Background Decorations */}
      <motion.div 
        className="absolute top-0 left-0 w-72 h-72 bg-[#4540E1]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#4540E1]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto py-24 px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-[#FFB800]">Why we are </span>  
            <span className="relative text-[#4540E1]">
              best from others?
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFB800]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </span>
          </h2>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            At Mentorify, we go beyond just connecting mentors and mentees. Our platform ensures 
            personalized guidance, effective communication, and flexible session scheduling.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} 
                blur-xl group-hover:blur-2xl transition-all duration-300`} />
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl 
                transition-all duration-300 border border-gray-100 backdrop-blur-sm">
                <motion.div 
                  className="text-5xl mb-6"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-[#4540E1] 
                  transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-lg group-hover:text-gray-700 
                  transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-4 left-8 right-8 h-0.5 bg-gradient-to-r 
                  from-transparent via-[#4540E1]/20 to-transparent scale-x-0 group-hover:scale-x-100 
                  transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyBest; 