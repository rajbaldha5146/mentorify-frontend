import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import WhyBest from '../components/home/WhyBest';
import MentorshipProcess from '../components/home/MentorshipProcess';
import Contact from '../components/home/Contact';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <WhyBest />
      <MentorshipProcess />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home; 