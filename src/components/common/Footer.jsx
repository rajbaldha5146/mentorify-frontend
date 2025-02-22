import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about-us' },
      { name: 'Contact Us', path: '/contact-us' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'Community', path: '/community' },
      { name: 'Resources', path: '/resources' },
    ],
    mentorship: [
      { name: 'Become a Mentor', path: '/mentor-signup' },
      { name: 'Find a Mentor', path: '/find-mentor' },
      { name: 'How It Works', path: '/how-it-works' },
      { name: 'Success Stories', path: '/success-stories' },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com' },
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#4540E1] to-[#3632B0] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-96 h-96 bg-white/5 rounded-full -top-48 -left-48"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute w-[40rem] h-[40rem] bg-white/5 rounded-full -bottom-96 -right-96"
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="text-3xl font-bold mb-6 inline-block">
                Mentorify
              </Link>
              <p className="text-white/80 mb-8 max-w-md">
                Empowering individuals through mentorship. Connect, learn, and grow with 
                experienced professionals in your field.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 
                      transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-6 capitalize">{title}</h3>
              <ul className="space-y-4">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors duration-300
                        relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white/50 
                        transition-all duration-300 group-hover:w-full"/>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row 
            justify-between items-center"
        >
          <p className="text-white/70 text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Mentorify. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 
              transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp className="text-xl group-hover:animate-bounce" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 