import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import PartnersSection from '@/components/home/PartnersSection';

const MinimalHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <PartnersSection />
        
        {/* Espace supplémentaire avant le footer */}
        <div className="py-8"></div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MinimalHome;
