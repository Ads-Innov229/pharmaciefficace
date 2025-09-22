import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import PricingSection from '../components/home/PricingSection';
import { Navbar } from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PartnersSection from '../components/home/PartnersSection';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default Home;